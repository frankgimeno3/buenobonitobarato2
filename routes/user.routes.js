const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");

/* GET home page */
router.get("/user", (req, res, next) => {
  Post.find().then((myPostDB) => {
    res.render("users/home", { post: myPostDB });
  });
});

router.get("/user/new-post", (req, res, next) => {
  res.render("users/formPost");
});

router.post("/user/new-post", (req, res, next) => {
  const { foto, restaurante, detalles, location } = req.body;
  console.log(req.body);
  Post.create({ foto, restaurante, detalles, location })
    .then((post) => {
      console.log("Post guardado en DB");
      res.redirect("/user");
    })
    .catch((err) => next(err));
});

router.get("/user/:postId", (req, res, next) => {
  const { postId } = req.params;
  console.log(postId);
  Post.findById(postId)
    .then((post) => {
      res.render("users/post-details", { details: post });
    })
    .catch((err) => next(err));
});
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
    const { postId } =req.params;
    Post.findById(postId).then((result) => {
        res.render("users/post-edit", {final: result})
    });
});
router.post("/user/:postId/edit", (req, res, next) =>{
    const {postId} = req.params;
    const { foto, restaurante, detalles, location } = req.body;
    Post.findByIdAndUpdate(
        postId,
        { foto, restaurante, detalles, location },
        {new: true}
    )
    .then((update) => {
        console.log(update);
        res.redirect(`/user/${update.id}`);
    })
    .catch((err) => next(err));
})


module.exports = router;
