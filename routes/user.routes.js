const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const { db } = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/user", (req, res, next) => {
  let myUserId = req.session.currentUser._id;
  console.log("**myuser id**=", myUserId);
  //console.log(req.session.currentUser);
  //console.log("All information from cookie", req.session.currentUser);
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
      console.log("Here is my data", myUserdb);
      res.render("users/home", { post: myUserdb });
    })

    .catch((err) => next(err));
});

router.get("/user/new-post", (req, res, next) => {
  res.render("users/formPost");
});

router.post("/user/new-post", fileUploader.single("foto"), (req, res, next) => {
  console.log("this is current user: ", req.session.currentUser._id);

  const creator = req.session.currentUser._id;
  console.log("soy elcreator", creator);
  const { foto, restaurante, detalles, location } = req.body;
  console.log(req.body);
  Post.create({ creator, foto: req.file.path, restaurante, detalles, location })
    .then((dbPost) => {
      return User.findByIdAndUpdate(creator, { $push: { posts: dbPost._id } });
    })
    .then((post) => {
      console.log("Post guardado en DB");
      res.redirect("/user");
    })
    .catch((err) => next(err));
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get("/user/:postId", (req, res, next) => {
  const { postId } = req.params;
  const myUsername = req.session.currentUser.username;
  //console.log(myUsername);
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
      console.log("Check the result", post.creator.username);

      if (post.creator.username === myUsername) {
        console.log("this is the second test", post);
        res.render("users/post-details", { details: post, status: true });
      } else {
        res.render("users/post-details", { details: post });
      }
    })
    .catch((err) => next(err));
});

// router.get("/user/:postId", (req, res, next) => {
//   const { postId } = req.params;
//   Post.findById(postId)
//     .populate("creator comments")
//
//     .then((foundPost) => {
//       console.log("This is comment array", foundPost);
//       res.render("users/post-details", foundPost);
//     })
//     .catch((err) => next(err));
// });
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post("/user/:postId", (req, res, next) => {
  const { postId } = req.params;
  const creator = req.session.currentUser._id;
  const { content } = req.body;
  //console.log("Session user_id:", creator);
  Post.findById(postId)
    .then((dbPost) => {
      let newComment;
      newComment = new Comment({ creator: creator, content });
      //console.log(newComment);
      newComment.save().then((dbComment) => {
        dbPost.comments.push(dbComment._id);
        dbPost.save().then((UpdatePost) => {
          //console.log("This is updated post", UpdatePost);
          res.redirect(`/user/${UpdatePost._id}`);
        });
      });
    })
    .catch((err) => next(err));
});
//************************************************************************************************ */

// ***************************************************************************************************
router.post("/user/:postId/delete", (req, res, next) => {
  const { postId } = req.params;
  console.log(postId);

  Post.findByIdAndDelete(postId)
    .then(() => {
      console.log("the post has been removed");
      res.redirect("/user");
    })
    .catch((err) => next(err));
});
router.get("/user/:postId/edit", (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId).then((result) => {
    res.render("users/post-edit", { final: result });
  });
});
router.post("/user/:postId/edit", (req, res, next) => {
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
