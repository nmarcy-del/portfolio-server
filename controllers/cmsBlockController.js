const CmsBlock = require("../models/cmsBlock");

// GET - Get all CMS Block
const getCmsBlock = async (req, res) => {
  try {
    const cmsBlock = await CmsBlock.find();
    res.json(cmsBlock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get Cms Block by id
const getCmsBlockById = async (req, res) => {
  try {
    const cmsBlock = await CmsBlock.findById(req.params.id);
    if (!cmsBlock) {
      return res.status(404).json({ message: "CMS not found" });
    }
    res.json(cmsBlock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get CMS by section
const getCmsBlockBySection = async (req, res) => {
  try {
    const section = req.params.section;
    const cmsBlock = await CmsBlock.find({ section: section });
    res.json(cmsBlock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create CMS
const createCmsBlock = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  const { title, content, img, section } = req.body;
  const cmsBlock = new CmsBlock({
    title,
    content,
    img: img || "",
    section,
  });
  try {
    const newCmsBlock = await cmsBlock.save();
    res.status(201).json(newCmsBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Modify CMS
const updateCmsBlock = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  try {
    const cmsBlock = await CmsBlock.findById(req.params.id);
    if (!cmsBlock) {
      return res.status(404).json({ message: "CMS not found" });
    }
    const { title, content, img, section } = req.body;
    cmsBlock.title = title;
    cmsBlock.content = content;
    cmsBlock.img = img || "";
    cmsBlock.section = section;
    const updatedCms = await cmsBlock.save();
    res.json(updatedCms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete CMS
const deleteCmsBlock = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  try {
    const cmsBlock = await CmsBlock.findById(req.params.id);
    if (!cmsBlock) {
      return res.status(404).json({ message: "CMS not found" });
    }
    await cmsBlock.remove();
    res.json({ message: "CMS deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCmsBlock,
  getCmsBlockById,
  getCmsBlockBySection,
  createCmsBlock,
  updateCmsBlock,
  deleteCmsBlock,
};
