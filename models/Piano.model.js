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
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  additionnalNotes: String,
});

const Piano = model("Piano", pianoSchema);

module.exports = Piano;
