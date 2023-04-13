const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "tokens" }
);

module.exports = mongoose.model("Token", tokenSchema);
