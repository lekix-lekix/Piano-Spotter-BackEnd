const router = require("express").Router();
const Piano = require("../models/Piano.model");

const { isAuthenticated } = require("../middlewares/jwt.middleware");

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
    console.log(req.body);
    const { location, pianoType, isVerified, additionnalNotes, addedBy } =
      req.body;
    const newPiano = {
      location,
      pianoType,
      additionnalNotes,
      addedBy,
      isVerified,
    };
    await Piano.create(newPiano);
    res.status(201).json(newPiano);
  } catch (error) {
    next(error);
  }
});

// Update a piano

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const onePiano = Piano.findById(id); // TO UPDATE
    res.json(onePiano);
  } catch (error) {
    next(error);
  }
});

// Delete a piano

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params);
    await Piano.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
