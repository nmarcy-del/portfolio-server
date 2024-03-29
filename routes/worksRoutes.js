const express = require("express");
const router = express.Router();
const worksController = require("../controllers/worksController");

// GET - Get works
router.get("/works", worksController.getWorks);

// GET - Get works by id
router.get("/works/:id", worksController.getWorkById);

// GET - Get works by start date with order params
router.get(
  "/works/byStartDate/:sortOrder?",
  worksController.getWorksByStartDate
);

// POST - Create work
router.post("/works", worksController.createWork);

// PUT - Modify work
router.put("/works/:id", worksController.updateWork);

// DELETE - Delete work
router.delete("/works/:id", worksController.deleteWork);

module.exports = router;
