const express = require("express");
const router = express.Router();
const csrfController = require("../controllers/csrfController");

// POST - Generate csrf token
router.post("/csrf", csrfController.csrf);

module.exports = router;
