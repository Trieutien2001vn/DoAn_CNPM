const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const nhaCungCapSchema = new mongoose.Schema(
  {
    ma_ncc: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_ncc: {
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
    fax: {
      type: String,
      default: "",
    },
    thong_tin_them: {
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
  { timestamps: true, collection: "nha_cung_cap" }
);
nhaCungCapSchema.index(
  { ma_ncc: "text", ten_ncc: "text" },
  { default_language: "none" }
);
nhaCungCapSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("NhaCungCap", nhaCungCapSchema);
