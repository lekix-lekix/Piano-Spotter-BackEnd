const router = require("express").Router();

// Routes prefixed with /api

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
