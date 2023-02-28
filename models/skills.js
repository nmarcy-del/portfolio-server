const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

const Skills = mongoose.model("Skills", skillsSchema);

module.exports = Skills;
