const Skills = require("../models/skills");

// GET - Get skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get skills by id
const getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create skill
const createSkill = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const skill = new Skills({
    name: req.body.name,
    img: req.body.img,
  });
  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Modify skill
const updateSkill = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    skill.name = req.body.name;
    skill.img = req.body.img;
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete skill
const deleteSkill = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    await skill.remove();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
