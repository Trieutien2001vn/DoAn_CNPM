const mongoose = require('mongoose');
const { generateUniqueValueUtil } = require('../../utils/myUtil');
const mongooseDelete = require('mongoose-delete');
const soQuyModel = require('./soQuy.model');

const phieuThuSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      default: '',
      unique: true,
    },
    ma_ct: {
      type: String,
      default: '',
    },
    ma_loai_ct: {
      type: String,
      default: 'ptt',
    },
    ten_loai_ct: {
      type: String,
      default: 'Phiếu thu tiền',
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
      default: '',
    },
    ten_nguoi_nop: {
      type: String,
      default: '',
    },
    ma_loai: {
      type: String,
      default: '',
    },
    ten_loai: {
      type: String,
      default: '',
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
      required: true,
    },
    ma_pttt: {
      type: String,
      default: '',
    },
    ten_pttt: {
      type: String,
      default: '',
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
phieuThuSchema.index(
  { ma_phieu: 'text', ma_nhom_nguoi_nop: 'text', ten_nhom_nguoi_nop: 'text' },
  { default_language: 'none' }
);
phieuThuSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
phieuThuSchema.pre('save', async function (next) {
  try {
    let error;
    const pt = this;
    if (!pt.ma_phieu) {
      const maPhieu = await generateUniqueValueUtil({
        maDm: 'PT',
        model: mongoose.model('PhieuThu', phieuThuSchema),
        compareKey: 'ma_phieu',
      });
      pt.ma_phieu = maPhieu;
    }
    const maChungTu = await generateUniqueValueUtil({
      maDm: 'PT',
      model: mongoose.model('PhieuThu', phieuThuSchema),
      compareKey: 'ma_ct',
    });
    pt.ma_ct = maChungTu;
    if (error) {
      return next(error);
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});
phieuThuSchema.post('save', async function () {
  const pt = this;
  // luu vao so quy
  await soQuyModel.create({
    ma_ct: pt.ma_ct,
    ma_loai_ct: pt.ma_loai_ct,
    ten_loai_ct: pt.ten_loai_ct,
    ten_nguoi_nop_nhan: pt.ten_nguoi_nop,
    ten_pttt: pt.ten_pttt,
    ngay_ct: pt.ngay_ct,
    ngay_lap_phieu: pt.ngay_lap_phieu,
    gia_tri: pt.gia_tri,
    tien: pt.gia_tri,
    dien_giai: pt.dien_giai,
  });
});
phieuThuSchema.post('updateOne', async function () {
  const pt = this.getUpdate().$set;
  await soQuyModel.updateOne(
    { ma_ct: pt.ma_ct },
    {
      ten_nguoi_nop_nhan: pt.ten_nguoi_nop,
      ten_pttt: pt.ten_pttt,
      ngay_ct: pt.ngay_ct,
      ngay_lap_phieu: pt.ngay_lap_phieu,
      gia_tri: pt.gia_tri,
      tien: pt.gia_tri,
      dien_giai: pt.dien_giai,
    }
  );
});

module.exports = mongoose.model('PhieuThu', phieuThuSchema);
