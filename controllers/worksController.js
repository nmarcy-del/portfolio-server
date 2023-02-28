const Works = require("../models/works");

// GET - Get works
const getWorks = async (req, res) => {
  try {
    const works = await Works.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get works by id
const getWorkById = async (req, res) => {
  try {
    const work = await Works.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }
    res.json(work);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create work
const createWork = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const work = new Works({
    title: req.body.title,
    shortDesc: req.body.shortDesc,
    img: req.body.img,
    desc: req.body.desc,
    technologie: req.body.technologie,
  });
  try {
    const newWork = await work.save();
    res.status(201).json(newWork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Modify work
const updateWork = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const work = await Works.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }
    work.title = req.body.title;
    work.shortDesc = req.body.shortDesc;
    work.img = req.body.img;
    work.desc = req.body.desc;
    work.technologie = req.body.technologie;
    const updatedWork = await work.save();
    res.json(updatedWork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete work
const deleteWork = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const work = await Works.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }
    await work.remove();
    res.json({ message: "Work deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getWorks, getWorkById, createWork, updateWork, deleteWork };
