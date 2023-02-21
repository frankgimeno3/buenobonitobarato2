const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    foto: {
      type: String,
    },
    restaurante: {
      type: String,
    },
    detalles: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
