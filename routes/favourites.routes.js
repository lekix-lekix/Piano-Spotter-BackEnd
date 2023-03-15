const router = require("express").Router();
const Favourites = require("../models/Favourites.model");
const ObjectId = require("mongodb").ObjectId;

// Routes prefixed with /favourites

// Get favourites of one user
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = new ObjectId(id);
    const favourites = await Favourites.find({ userId: userId }).populate(
      "pianoId"
    );
    res.json(favourites);
  } catch (error) {
    next(error);
  }
});

// Create a favourite
router.post("/create-fav", async (req, res, next) => {
  try {
    const { piano, userId, name } = req.body;
    const pianoId = piano._id;

    const newFavourite = { name, userId, pianoId };

    console.log(newFavourite);
    const pianoIdObjId = new ObjectId(pianoId);
    const userIdObjId = new ObjectId(userId);

    const isAlreadyFav = await Favourites.find({
      pianoId: pianoIdObjId,
      userId: userIdObjId,
    });

    if (isAlreadyFav.length !== 0) {
      return res
        .status(409)
        .json({ message: "You already added this piano to your favourites!" });
    }

    await Favourites.create(newFavourite);
    res.status(201).json(newFavourite);
  } catch (error) {
    next(error);
  }
});

// Update NAME of a favourite

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedFav = await Favourites.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(202).json(updatedFav);
  } catch (error) {
    next(error);
  }
});

// Delete a favourite
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Favourites.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
