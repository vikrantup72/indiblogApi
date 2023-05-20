const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
      default: "PUBLIC",
      require: true,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", BlogSchema);

module.exports = Blogs;
