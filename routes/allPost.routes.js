const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const { db } = require("../models/User.model");

router.get("/all-Post", (req, res, next) => {
  Post.find()
    .populate("creator")
    .then((result) => {
      console.log(result);
      res.render("allPost/all-Post", { allpost: result });
    });
});

module.exports = router;
