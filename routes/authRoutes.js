const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST - Login user
router.post("/login", authController.login);

// GET - Logout user
router.get("/logout", authController.logout);

module.exports = router;
