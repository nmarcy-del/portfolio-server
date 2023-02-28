const Cms = require("../models/cms");

// GET - Get all CMS
const getCms = async (req, res) => {
  try {
    const cms = await Cms.find();
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get CMS by id
const getCmsById = async (req, res) => {
  try {
    const cms = await Cms.findById(req.params.id);
    if (!cms) {
      return res.status(404).json({ message: "CMS not found" });
    }
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get CMS by section
const getCmsBySection = async (req, res) => {
  try {
    const section = req.params.section;
    const cms = await Cms.find({ section: section });
    res.json(cms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create CMS
const createCms = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, content, img, section, typeWriter } = req.body;
  const cms = new Cms({
    title,
    content,
    img: img || "",
    section,
    typeWriter: typeWriter || "",
  });
  try {
    const newCms = await cms.save();
    res.status(201).json(newCms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Modify CMS
const updateCms = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const cms = await Cms.findById(req.params.id);
    if (!cms) {
      return res.status(404).json({ message: "CMS not found" });
    }
    const { title, content, img, section, typeWriter } = req.body;
    cms.title = title;
    cms.content = content;
    cms.img = img || "";
    cms.section = section;
    cms.typeWriter = typeWriter || "";
    const updatedCms = await cms.save();
    res.json(updatedCms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete CMS
const deleteCms = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const cms = await Cms.findById(req.params.id);
    if (!cms) {
      return res.status(404).json({ message: "CMS not found" });
    }
    await cms.remove();
    res.json({ message: "CMS deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCms,
  getCmsById,
  createCms,
  updateCms,
  deleteCms,
  getCmsBySection,
};
