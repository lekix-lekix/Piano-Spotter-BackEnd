const mongoose = require("mongoose");
const Piano = require("../models/Piano.model");

const rawPianoData = require("./data.json");
const { features } = rawPianoData;

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Piano-Spotter-back-end";

// Calling every seed function

mongoose
  .set("strictQuery", false)
  .connect(MONGO_URI)
  .then(async (x) => {
    try {
      const dbName = x.connections[0].name;
      console.log(`Connected to Mongo! Database name: "${dbName}"`);
      await pianoSeed();
      await mongoose.disconnect();
    } catch (error) {
      console.error(error);
    }
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// Seeding pianos to the database

const pianoSeed = async () => {
  const pianoData = buildCleanPianoDB();
  try {
    await Piano.deleteMany();
    console.log("Piano data successfully deleted!");
    await Piano.create(pianoData);
    console.log("Piano seed successfully created!");
  } catch (error) {
    console.log(error);
  }
};

// Building a clean database from OSM data

const buildCleanPianoDB = () => {
  const pianoData = [];

  const copyright = {
    type: rawPianoData.type,
    generator: rawPianoData.generator,
    copyright: rawPianoData.copyright,
    timestamp: rawPianoData.timestamp,
  };

  features.map((element) => {
    if (element.copyright) {
      return pianoData.push(element);
    }

    const newPianoObj = {
      location: {
        type: "Point",
        coordinates: [
          element.geometry.coordinates[0],
          element.geometry.coordinates[1],
        ],
      },
      isVerified: false,
    };
    pianoData.push(newPianoObj);
  });

  // pianoData.unshift(copyright);
  return pianoData;
};
