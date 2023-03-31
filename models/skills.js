const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Skills = mongoose.model("Skills", skillsSchema);

module.exports = Skills;
