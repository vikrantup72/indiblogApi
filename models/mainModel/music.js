const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema(
  {
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Musics = mongoose.model("music", MusicSchema);

module.exports = Musics;
