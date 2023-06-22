const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
/**
{
 // thông tin chung
  ma_ct: '',
  ma_loai_ct: '',
  ten_loai_ct: '',
  ma_kho: '',
  ten_kho: '',
  ngay_ct: '',
  nam: '',
  quy: '',
  thang: '',
  ngay: '',
  gio: '',
  phut: '',
  giay: '',
  ma_vt: '',
  ten_vt: '',
  ma_dvt: '',
  ten_dvt: '',
  ma_nvt: '',
  ten_nvt: '',
  ma_lo: '',
  ten_lo: '',
  ma_pttt: '',
  ten_pttt: '',
  so_luong: '',
  gia_von: '',
  tien_hang: '',
  thanh_tien: '',
  thanh_tien_thue: '',
  thue: '',
  // thông tin về kho
  ma_ncc: '',
  ten_ncc: '',
  sl_nhap: '',
  // thông tin cho phiếu bán hàng
  ma_nv: '',
  ten_nv: '',
  ma_kh: '',
  ten_kh: '',
  ma_kenh: '',
  ten_kenh: '',
  sl_xuat: '',
  chi_phi: '',
  don_gia: '',
  ty_le_ck: '',
  tien_ck: '',
  tien_ck_phan_bo: '',
  tien_van_chuyen: '',
  tien_hang_ck: '',
  loi_nhuan: '',
}
 */

const soCaiSchema = new mongoose.Schema(
  {
    // thông tin chung
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
    ma_vt: {
      type: String,
      required: true,
    },
    ten_vt: {
      type: String,
      required: true,
    },
    ma_dvt: {
      type: String,
      default: ''
    },
    ten_dvt: {
      type: String,
      default:''
    },
    ma_nvt: {
      type: String,
      default: '',
    },
    ten_nvt: {
      type: String,
      default: '',
    },
    ma_lo: {
      type: String,
      default: '',
    },
    ten_lo: {
      type: String,
      default: '',
    },
    ma_pttt: {
      type: String,
      default: '',
    },
    ten_pttt: {
      type: String,
      default: '',
    },
    so_luong: {
      type: Number,
      default: 0,
    },
    gia_von: {
      type: Number,
      default: 0
    },
    tien_hang: {
      type: Number,
      default: 0,
    },
    thanh_tien: {
      type: Number,
      default: 0,
    },
    thanh_tien_thue: {
      type: Number,
      default: 0,
    },
    thue: {
      type: Number,
      default: 0,
    },
    // thông tin riêng cho hoạt động kho
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
    // thông tin riêng cho phiếu bán hàng
    ma_nv: {
      type: String,
      default: '',
    },
    ten_nv: {
      type: String,
      default: '',
    },
    ma_kh: {
      type: String,
      default: '',
    },
    ten_kh: {
      type: String,
      default: '',
    },
    ma_kenh: {
      type: String,
      default: '',
    },
    ten_kenh: {
      type: String,
      default: '',
    },
    sl_xuat: {
      type: Number,
      default: 0,
    },
    chi_phi: {
      type: Number,
      default: 0
    },
    don_gia: {
      type: Number,
      default: 0
    },
    ty_le_ck: {
      type: Number,
      default: 0
    },
    tien_ck: {
      type: Number,
      default: 0,
    },
    tien_ck_phan_bo: {
      type: Number,
      default: 0,
    },
    tien_van_chuyen: {
      type: Number,
      default: 0,
    },
    tien_hang_ck: {
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
