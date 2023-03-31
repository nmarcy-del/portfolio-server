const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsBlockController");

// GET - Get all CMS
router.get("/cms-block", cmsController.getCmsBlock);

// GET - Get CMS by id
router.get("/cms-block/:id", cmsController.getCmsBlockById);

// GET - Get CMS by section
router.get("/cms-block/section/:section", cmsController.getCmsBlockBySection);

// POST - Create CMS
router.post("/cms-block", cmsController.createCmsBlock);

// PUT - Modify CMS
router.put("/cms-block/:id", cmsController.updateCmsBlock);

// DELETE - Delete CMS
router.delete("/cms-block/:id", cmsController.deleteCmsBlock);

module.exports = router;
