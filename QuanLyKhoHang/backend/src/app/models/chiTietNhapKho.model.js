const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const chiTietNhapKhoSchema = new mongoose.Schema(
  {
    gia_von: {
      type: Number,
      default: 0,
    },
    ma_dvt: {
      type: String,
      default: "",
    },
    ten_dvt: {
      type: String,
      default: "",
    },
    ma_ncc: {
      type: String,
      default: "",
    },
    ten_ncc: {
      type: String,
      default: "",
    },
    ma_lo: {
      type: String,
      default: "",
    },
    ten_lo: {
      type: String,
      default: "",
    },
    ma_nv: {
      type: String,
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
    so_luong_nhap: {
      type: Number,
      default: 0,
    },
    tien_nhap: {
      type: Number,
      default: 0,
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
  { timestamps: true, collection: "chi_tiet_nhap_kho" }
);
chiTietNhapKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("ChiTietNhapKho", chiTietNhapKhoSchema);
