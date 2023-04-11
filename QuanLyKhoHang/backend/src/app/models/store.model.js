const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const storeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    address: {
      type: String,
      default: "",
    },
    updatedBy: {
      type: String,
      ref: "User",
      default: "",
    },
  },
  { autoIndex: false, timestamps: true, collection: "stores" }
);
storeSchema.index({ code: "text", name: "text" }, { default_language: "none" });
storeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("Store", storeSchema);
