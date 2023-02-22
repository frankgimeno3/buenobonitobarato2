// const express = require("express");
// const router = express.Router();
// const User = require("../models/User.model");
// const Post = require("../models/Post.model");
// const Comment = require("../models/Comment.model");

// router.get("/user/:postId/comment", (req, res, next) => {
//   console.log(req.session.currentUser);
//   User.findById(req.session.currentUser)
//     .then((userInfo) => {
//       console.log("This is user Info from DB", userInfo);
//       res.render("comments/add-comments", { info: userInfo });
//     })
//     .catch((err) => next(err));
// });

// router.post("/user/:postId/comment", (req, res, next) => {
//   const { postId } = req.params;
//   console.log(req.session.currentUser);
//   console.log("This is the post id: ", postId);
//   const { creator, content } = req.body;
//   console.log("This is coming from comment form", req.body);
//   Post.findById(postId)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => next(err));
// });

// module.exports = router;
