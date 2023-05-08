const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const loSchema = new mongoose.Schema(
  {
    ma_lo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_lo: {
      type: String,
      required: true,
      index: true,
    },
    ngay_san_xuat: {
      type: Date,
      default: "",
    },
    han_su_dung: {
      type: Date,
      default: "",
    },
    ma_vt: {
      type: String,
      default: "",
    },
    ten_vt: {
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
  { timestamps: true, collection: "lo" }
);
loSchema.index({ ma_lo: "text", ten_lo: "text" }, { default_language: "none" });
loSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("Lo", loSchema);
