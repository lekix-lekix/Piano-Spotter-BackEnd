const router = require("express").Router();
const Piano = require("../models/Piano.model");

// Routes prefixed with /pianos

// Get all pianos (used for markers)

router.get("/", async (req, res, next) => {
  try {
    const allPianos = await Piano.find();
    res.json(allPianos);
  } catch (error) {
    next(error);
  }
});

// Get one piano

router.get("/:id", async (req, res, next) => {
  try {
    const onePiano = await Piano.findById(req.params.id);
    res.json(onePiano);
  } catch (error) {
    next(error);
  }
});

// Create a new piano

router.post("/new-piano", async (req, res, next) => {
  try {
    const { location, pianoType, verified, additionnalNotes } = req.body;
    await Piano.create(newPiano);
    res.status(201).json(newPiano); // TO UPDATE
  } catch (error) {
    next(error);
  }
});

// Update a piano

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const onePiano = Piano.findById(id);
    res.json(onePiano);
  } catch (error) {
    next(error);
  }
});

// Delete a piano

router.delete("/:id", async (req, res, next) => {
  try {
    await Piano.findByIdAndDelete(req.params);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
