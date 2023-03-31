const mongoose = require("mongoose");

const CVFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CVFile = mongoose.model("CVFile", CVFileSchema);

module.exports = CVFile;
