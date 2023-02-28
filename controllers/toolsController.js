const Tools = require("../models/tools");

// GET - Get tools
const getTools = async (req, res) => {
  try {
    const tools = await Tools.find();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get tools by id
const getToolById = async (req, res) => {
  try {
    const tool = await Tools.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create tool
const createTool = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tool = new Tools({
    name: req.body.name,
    img: req.body.img,
  });
  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Modify tool
const updateTool = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const tool = await Tools.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    tool.name = req.body.name;
    tool.img = req.body.img;
    const updatedTool = await tool.save();
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete tool
const deleteTool = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const tool = await Tools.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    await tool.remove();
    res.json({ message: "Tool deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool,
};
