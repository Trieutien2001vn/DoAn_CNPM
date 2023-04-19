const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const nhomVatTuSchema = new mongoose.Schema(
  {
    ma_nvt: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_nvt: {
      type: String,
      required: true,
      index: true,
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
  { timestamps: true, collection: "nhom_vat_tu" }
);
nhomVatTuSchema.index(
  { ma_nvt: "text", ten_nvt: "text" },
  { default_language: "none" }
);
nhomVatTuSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("NhomVatTu", nhomVatTuSchema);
