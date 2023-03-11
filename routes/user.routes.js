const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const { db } = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* GET home page read post populating USER model*/
router.get("/user", isLoggedIn, (req, res, next) => {
  let myUserId = req.session.currentUser._id;
  console.log(req.session.currentUser.isAdmin);
  User.findById(myUserId)
    .populate("posts")
    .populate({
      path: "posts",
      populate: {
        path: "comments",
        model: "Comment",
      },
    })
    .then((myUserdb) => {
      console.log("Checking if the user isAdmin ==", myUserdb.isAdmin);
      console.log("Here is my data", myUserdb);
      res.render("users/home", { post: myUserdb });
    })

    .catch((err) => next(err));
});
// Create New Post
router.get("/user/new-post", isLoggedIn, (req, res, next) => {
  res.render("users/formPost");
});

router.post("/user/new-post", fileUploader.single("foto"), (req, res, next) => {
  const creator = req.session.currentUser._id;

  const { foto, restaurante, detalles, location } = req.body;

  Post.create({ creator, foto: req.file.path, restaurante, detalles, location })
    .then((dbPost) => {
      console.log("this is reslu for post", dbPost);
      return User.findByIdAndUpdate(creator, { $push: { posts: dbPost._id } });
    })
    .then((post) => {
      console.log("Post guardado en DB");
      res.redirect("/user");
    })
    .catch((err) => next(err));
});

// GET post by ID
router.get("/user/:postId", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  const myUsername = req.session.currentUser.username;
  const admin = req.session.currentUser.isAdmin;
  console.log(" This is the user logged in", myUsername);
  console.log("This is information from loggedin user", admin);

  Post.findById(postId)
    .populate("creator comments")
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        model: "User",
      },
    })

    .then((post) => {
      //Check if the current session user is owner of post or the user is admin
      if (post.creator.username === myUsername || admin) {
        res.render("users/post-details", { details: post, status: true });
      } else {
        res.render("users/post-details", { details: post });
      }
    })
    .catch((err) => next(err));
});

// POST post by ID
router.post("/user/:postId", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  const creator = req.session.currentUser._id;
  const { content } = req.body;

  Post.findById(postId)
    .then((dbPost) => {
      let newComment;
      newComment = new Comment({ creator: creator, content });

      newComment.save().then((dbComment) => {
        dbPost.comments.push(dbComment._id);
        dbPost.save().then((UpdatePost) => {
          res.redirect(`/user/${UpdatePost._id}`);
        });
      });
    })
    .catch((err) => next(err));
});

// POST find post by ID and DELETE
router.post("/user/:postId/delete", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId)
    .then(() => {
      res.redirect("/user");
    })
    .catch((err) => next(err));
});

// GET find post by ID and Update
router.get("/user/:postId/edit", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId).then((result) => {
    res.render("users/post-edit", { final: result });
  });
});
router.post("/user/:postId/edit", isLoggedIn, (req, res, next) => {
  const { postId } = req.params;
  const { foto, restaurante, detalles, location } = req.body;
  Post.findByIdAndUpdate(
    postId,
    { foto, restaurante, detalles, location },
    { new: true }
  )
    .then((update) => {
      console.log(update);
      res.redirect(`/user/${update.id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
