const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

// GET - Get CV filename
router.get("/cv", cvController.getCVFilename);

// GET - Download CV
router.get("/cv/download/:filename", cvController.downloadCV);

// POST - Upload CV
router.post("/cv", uploadMiddleware, cvController.uploadCV);

// Delete - Delete CV
router.delete("/cv", cvController.deleteCV);

module.exports = router;
