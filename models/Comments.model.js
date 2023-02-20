const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema({
  author: {
    type: String,
    required: true,
    },
  content: {
    type: String,
    required: true,
    },
  createdAt: {
    type: Date,
    default: Date.now,
    },
});
const Comment = model("Comment", commentSchema);

module.exports = Comment;