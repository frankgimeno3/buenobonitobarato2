const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },

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

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    // comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
