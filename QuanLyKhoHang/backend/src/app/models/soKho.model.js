const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
/**
 {
  ma_ct: '',
  ma_loai_ct: '',
  ten_loai_ct: '',
  ma_kho: '',
  ten_kho: '',
  ngay_ct: '',
  nam: 0,
  quy: 0,
  thang: 0,
  ngay: 0,
  gio: 0,
  phut: 0,
  giay: 0,
  ma_lo: '',
  ten_lo: '',
  ma_vt: '',
  ten_vt: '',
  ma_ncc: '',
  ten_ncc: '',
  sl_nhap: 0,
  sl_xuat: 0,
  so_luong: 0,
 }
 */

const soKhoSchema = new mongoose.Schema(
  {
    ma_ct: {
      type: String,
    },
    ma_loai_ct: {
      type: String,
    },
    ten_loai_ct: {
      type: String,
    },
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
      type: String,
      required: true,
    },
    // bat dau ngay thang
    ngay_ct: {
      type: Date,
      default: null
    },
    nam: {
      type: Number,
      default: 0
    },
    quy: {
      type: Number,
      default: 0
    },
    thang: {
      type: Number,
      default: 0
    },
    ngay: {
      type: Number,
      default: 0
    },
    gio: {
      type: Number,
      default: 0,
    },
    phut: {
      type: Number,
      default: 0,
    },
    giay: {
      type: Number,
      default: 0,
    },
    // ket thuc ngay thang
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
    ma_ncc: {
      type: String,
      default: '',
    },
    ten_ncc: {
      type: String,
      default: '',
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
      default: '',
    },
    updatedBy: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, collection: 'so_kho' }
);

soKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("SoKho", soKhoSchema);
