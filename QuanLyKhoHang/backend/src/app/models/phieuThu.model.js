const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const phieuThuSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      required: true,
      unique: true,
    },
    so_ct: {
      type: String,
      required: true,
      unique: true,
    },
    ma_nhom_nguoi_nop: {
      type: String,
      default: '',
    },
    ten_nhom_nguoi_nop: {
      type: String,
      default: '',
    },
    ma_nguoi_nop: {
      type: String,
      required: true,
    },
    ten_nguoi_nop: {
      type: String,
      required: true,
    },
    ma_loai_phieu_thu: {
      type: String,
      required: true,
    },
    ten_loai_phieu_thu: {
      type: String,
      required: true,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ngay_lap_phieu: {
      type: Date,
      default: null,
    },
    gia_tri: {
      type: Number,
      default: 0,
    },
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
      type: String,
      required: true,
    },
    dien_giai: {
      type: String,
      default: '',
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
  { timestamps: true, collection: 'phieu_thu' }
);

phieuThuSchema.index({ ma_phieu: 'text' }, { default_language: 'none' });
phieuThuSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhieuThu', phieuThuSchema);
