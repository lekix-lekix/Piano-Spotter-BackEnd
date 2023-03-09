const { Schema, model } = require("mongoose");

const favouritesSchema = new Schema({
  favouritesPiano: [
    {
      piano: {
        type: Schema.Types.ObjectId,
        ref: "Piano",
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Favourites = model("Favourites", favouritesSchema);

module.exports = Favourites;
