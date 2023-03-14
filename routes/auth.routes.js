const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/jwt.middleware");

const User = require("../models/User.model");

const saltRounds = 10;

// Routes prefixed with "/auth"

// Registering a new user in the DB

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (email === "" || password === "" || username === "") {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.find({ email });
    if (user.length !== 0)
      return res
        .status(400)
        .json({ message: "A user already exists with these credentials." });

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      username,
      password: hashedPassword,
      email,
    });

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

// Checking if a user exists in the DB and creating a JWT Token for authentification

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "User not found! Please sign up." });
    }
    //console.log(foundUser);
    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong credentials." });
    } else {
      const { _id, email, username } = foundUser;
      const payload = { _id, email, username };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "24h",
      });

      res.status(200).json({ authToken: authToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
