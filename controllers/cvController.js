const fs = require("fs");
const path = require("path");
const CVFile = require("../models/cvFile");
const config = require("../config/config");

// GET - Get CV filename
const getCVFilename = async (req, res) => {
  try {
    const latestFile = await CVFile.findOne().sort({ createdAt: -1 });
    if (latestFile) {
      res.json({ filename: latestFile.filename });
    } else {
      res.status(404).json({ message: "No file found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching filename: " + err.message });
  }
};

// GET - Download CV
const downloadCV = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "..", config.publicFolder, filename);
  res.download(filepath, (err) => {
    if (err) {
      res.status(500).json({ message: "Error downloading CV: " + err.message });
    }
  });
};

// POST - Upload CV
const uploadCV = async (req, res) => {
  try {
    const latestFile = await CVFile.findOne().sort({ createdAt: -1 });
    if (latestFile) {
      const oldFilepath = path.join(
        __dirname,
        "..",
        config.publicFolder,
        latestFile.filename
      );
      fs.unlink(oldFilepath, (err) => {
        if (err) {
          console.error("Error deleting old file:", err);
        }
      });
    }

    const newFile = new CVFile({ filename: req.file.filename });
    await newFile.save();
    res.json({
      message: "CV uploaded successfully",
      filename: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ message: "Error uploading CV: " + err.message });
  }
};

// DELETE - Delete CV
const deleteCV = async (req, res) => {
  try {
    const latestFile = await CVFile.findOne().sort({ createdAt: -1 });
    if (latestFile) {
      const oldFilepath = path.join(
        __dirname,
        "..",
        config.publicFolder,
        latestFile.filename
      );
      fs.unlink(oldFilepath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          res
            .status(500)
            .json({ message: "Error deleting file: " + err.message });
        } else {
          latestFile.remove();
          res.json({ message: "CV deleted successfully" });
        }
      });
    } else {
      res.status(404).json({ message: "No file found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting CV: " + err.message });
  }
};

module.exports = {
  getCVFilename,
  downloadCV,
  uploadCV,
  deleteCV,
};
