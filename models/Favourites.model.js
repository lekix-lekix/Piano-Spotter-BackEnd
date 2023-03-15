const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema({
  name: String,
  pianoId: {
    type: Schema.Types.ObjectId,
    ref: "Piano",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Favourites = model("Favourites", favouriteSchema);

module.exports = Favourites;
