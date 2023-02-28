const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  section: {
    type: String,
    required: true,
  },
  typeWriter: {
    type: String,
  },
});

const CMS = mongoose.model("CMS", cmsSchema);

module.exports = CMS;
