// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const pianoRoutes = require("./routes/piano.routes");
const authRoutes = require("./routes/auth.routes");
const favRoutes = require("./routes/favourites.routes");
const isAuthenticated = require("./middlewares/jwt.middleware");

app.use("/api", indexRoutes);
app.use("/pianos", pianoRoutes);
app.use("/auth", authRoutes);
app.use("/favourites", favRoutes, isAuthenticated);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

require("./error-handling")(app);

module.exports = app;
