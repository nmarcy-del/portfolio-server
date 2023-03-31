const express = require("express");
const router = express.Router();
const skillsController = require("../controllers/skillsController");

// GET - Get skills
router.get("/skills", skillsController.getSkills);

// GET - Get skills by id
router.get("/skills/:id", skillsController.getSkillById);

// GET - Get tools by order
router.get("/skills/order/:sortOrder?", skillsController.getSkillsByOrder);

// POST - Create skill
router.post("/skills", skillsController.createSkill);

// PUT - Modify skill
router.put("/skills/:id", skillsController.updateSkill);

// DELETE - Delete skill
router.delete("/skills/:id", skillsController.deleteSkill);

module.exports = router;
