const Works = require("../models/works");

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  return errors;
};

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

// GET - Get works by start date
const getWorksByStartDate = async (req, res) => {
  try {
    const sortOrder = req.params.sortOrder === "desc" ? "desc" : "asc";
    if (sortOrder !== "asc" && sortOrder !== "desc") {
      return res.status(400).json({ message: "Invalid sort order" });
    }
    const works = await Works.find().sort({ startDate: sortOrder });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create work
const createWork = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  const work = new Works({
    title: req.body.title,
    img: req.body.img,
    place: req.body.place,
    desc: req.body.desc,
    technologies: req.body.technologies,
    startDate: new Date(req.body.startDate),
    endDate: req.body.endDate ? new Date(req.body.endDate) : null,
  });
  try {
    const newWork = await work.save();
    res.status(201).json(newWork);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = handleValidationError(err);
      return res.status(400).json({ message: errors });
    }
    res.status(500).json({ message: err.message });
  }
};

// PUT - Modify work
const updateWork = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  try {
    const work = await Works.findById(req.params.id);
    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }
    work.title = req.body.title;
    work.img = req.body.img;
    work.place = req.body.place;
    work.desc = req.body.desc;
    work.technologies = req.body.technologies;
    work.startDate = new Date(req.body.startDate);
    work.endDate = new Date(req.body.endDate);

    const updatedWork = await work.save();
    res.json(updatedWork);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = handleValidationError(err);
      return res.status(400).json({ message: errors });
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Delete work
const deleteWork = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
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

module.exports = {
  getWorks,
  getWorkById,
  getWorksByStartDate,
  createWork,
  updateWork,
  deleteWork,
};
