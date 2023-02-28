const mongoose = require("mongoose");

const toolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const Tools = mongoose.model("Tools", toolsSchema);

module.exports = Tools;
