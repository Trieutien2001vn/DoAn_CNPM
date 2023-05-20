const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const soKhoSchema = new mongoose.Schema(
  {
    ma_ct: {
      type: String,
      required: true,
    },
    ma_loai_ct: {
      type: String,
      required: true,
    },
    ten_loai_ct: {
      type: String,
      required: true,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
      type: String,
      required: true,
    },
    ma_lo: {
      type: String,
    },
    ten_lo: {
      type: String,
    },
    ma_vt: {
      type: String,
      required: true,
    },
    ten_vt: {
      type: String,
      required: true,
    },
    gia_von: {
      type: Number,
      default: 0,
    },
    sl_nhap: {
      type: Number,
      default: 0,
    },
    sl_xuat: {
      type: Number,
      default: 0,
    },
    so_luong: {
      type: Number,
      default: 0,
      require: true,
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
  { timestamps: true, collection: "so_kho" }
);

soKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("SoKho", soKhoSchema);
