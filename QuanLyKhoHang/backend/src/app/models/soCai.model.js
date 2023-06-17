const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
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
  ma_vt: '',
  ten_vt: '',
  ma_nvt: '',
  ten_nvt: '',
  ma_nv: '',
  ten_nv: '',
  ma_ncc: '',
  ten_ncc: '',
  sl_nhap: 0,
  sl_xuat: 0,
  tien_hang: 0,
  tien_ck: 0,
  tong_tien: 0,
  chi_phi: 0,
  loi_nhuan: 0,
}
 */

const soCaiSchema = new mongoose.Schema(
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
      required: true,
    },
    nam: {
      type: Number,
      required: true,
    },
    quy: {
      type: Number,
      required: true,
    },
    thang: {
      type: Number,
      required: true,
    },
    ngay: {
      type: Number,
      required: true,
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
    ma_vt: {
      type: String,
      required: true,
    },
    ten_vt: {
      type: String,
      required: true,
    },
    ma_nvt: {
      type: String,
      default: '',
    },
    ten_nvt: {
      type: String,
      default: '',
    },
    ma_nv: {
      type: String,
      default: '',
    },
    ten_nv: {
      type: String,
      default: '',
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
    // tien
    tien_hang: {
      type: Number,
      default: 0,
    },
    tien_ck: {
      type: Number,
      default: 0,
    },
    tong_tien: {
      type: Number,
      default: 0,
    },
    chi_phi: {
      type: Number,
      default: 0,
    },
    loi_nhuan: {
      type: Number,
      default: 0,
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
  { timestamps: true, collection: 'so_cai' }
);

soCaiSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('SoCai', soCaiSchema);
