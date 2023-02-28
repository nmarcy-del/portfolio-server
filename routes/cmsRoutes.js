const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");

// GET - Get all CMS
router.get("/", cmsController.getCms);

// GET - Get CMS by id
router.get("/:id", cmsController.getCmsById);

// GET - Get CMS by section
router.get("/section/:section", cmsController.getCmsBySection);

// POST - Create CMS
router.post("/", cmsController.createCms);

// PUT - Modify CMS
router.put("/:id", cmsController.updateCms);

// DELETE - Delete CMS
router.delete("/:id", cmsController.deleteCms);

module.exports = router;
