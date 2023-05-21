const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    title: {
      type: String,
      required: true,
    },
    blogImg: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    visibleType: {
      type: String,
      //   default: "Active",
      require: true,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", BlogSchema);

module.exports = Blogs;
