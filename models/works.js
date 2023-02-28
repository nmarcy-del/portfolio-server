const mongoose = require("mongoose");

const worksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  technologie: {
    type: String,
  },
});

const Works = mongoose.model("Works", worksSchema);

module.exports = Works;
