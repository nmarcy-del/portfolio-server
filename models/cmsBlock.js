const mongoose = require("mongoose");

const cmsBlockSchema = new mongoose.Schema({
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
});

const CmsBlock = mongoose.model("cmsBlock", cmsBlockSchema);

module.exports = CmsBlock;
