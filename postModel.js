const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: "String",
    content: "String",
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", schema);
module.exports = Post;