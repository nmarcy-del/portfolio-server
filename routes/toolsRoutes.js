const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsController");

// GET - Get tools
router.get("/tools", toolsController.getTools);

// GET - Get tool by id
router.get("/tools/:id", toolsController.getToolById);

// GET - Get tools by order
router.get("/tools/order/:sortOrder?", toolsController.getToolsByOrder);

// POST - Create tool
router.post("/tools", toolsController.createTool);

// PUT - Modify tool
router.put("/tools/:id", toolsController.updateTool);

// DELETE - Delete tool
router.delete("/tools/:id", toolsController.deleteTool);

module.exports = router;
