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

// Finding all pianos added by a user

router.get("/profile/pianos", async (req, res, next) => {
  try {
    const pianosBySomeone = await Piano.find({
      addedBy: req.body,
    }).populate("addedBy");
    res.json(pianosBySomeone);
  } catch (error) {
    next(error);
  }
});

// Create a new piano

router.post("/new-piano", async (req, res, next) => {
  try {
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
    const { id } = req.params;
    await Piano.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
