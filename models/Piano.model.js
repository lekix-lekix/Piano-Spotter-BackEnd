const { Schema, model } = require("mongoose");

const pianoSchema = new Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  pianoType: {
    type: String,
    enum: ["Upright", "Grand", "Digital"],
  },
  isVerified: Boolean,
  additionnalNotes: String,
});

const Piano = model("Piano", pianoSchema);

module.exports = Piano;
