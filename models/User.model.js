const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { String, required },
    password: { String, required },
    email: { String, required },
    favouritePianos: {
      type: Schema.Types.ObjectId,
      ref: "Favourites",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
