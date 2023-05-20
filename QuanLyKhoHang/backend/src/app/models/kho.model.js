const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const khoSchema = new mongoose.Schema(
  {
    ma_kho: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_kho: {
      type: String,
      required: true,
      index: true,
    },
    dia_chi: {
      type: String,
      default: "",
    },
    dien_thoai: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      default: "",
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "kho" }
);
khoSchema.index(
  { ma_kho: "text", ten_kho: "text" },
  { default_language: "none" }
);
khoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("Kho", khoSchema);
