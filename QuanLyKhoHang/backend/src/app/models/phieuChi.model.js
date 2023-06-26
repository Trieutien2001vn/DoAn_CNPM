const mongoose = require('mongoose');
const { generateUniqueValueUtil } = require('../../utils/myUtil');
const mongooseDelete = require('mongoose-delete');
const soQuyModel = require('./soQuy.model');

const phieuChiSchema = new mongoose.Schema(
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
      default: 'pct',
    },
    ten_loai_ct: {
      type: String,
      default: 'Phiếu chi tiền',
    },
    ma_nhom_nguoi_nhan: {
      type: String,
      default: '',
    },
    ten_nhom_nguoi_nhan: {
      type: String,
      default: '',
    },
    ma_nguoi_nhan: {
      type: String,
      default: '',
    },
    ten_nguoi_nhan: {
      type: String,
      default: '',
    },
    ma_loai: {
      type: String,
      required: true,
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
  { timestamps: true, collection: 'phieu_chi' }
);
phieuChiSchema.index(
  { ma_phieu: 'text', ma_nhom_nguoi_nhan: 'text', ten_nhom_nguoi_nhan: 'text' },
  { default_language: 'none' }
);
phieuChiSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});
phieuChiSchema.pre('save', async function (next) {
  try {
    let error;
    const pc = this;
    if (!pc.ma_phieu) {
      const maPhieu = await generateUniqueValueUtil({
        maDm: 'PC',
        model: mongoose.model('PhieuChi', phieuChiSchema),
        compareKey: 'ma_phieu',
      });
      pc.ma_phieu = maPhieu;
    }
    const maChungTu = await generateUniqueValueUtil({
      maDm: 'PC',
      model: mongoose.model('PhieuChi', phieuChiSchema),
      compareKey: 'ma_ct',
    });
    pc.ma_ct = maChungTu;

    if (error) {
      return next(error);
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});
phieuChiSchema.post('save', async function () {
  const pc = this;
  // luu vao so quy
  await soQuyModel.create({
    ma_ct: pc.ma_ct,
    ma_loai_ct: pc.ma_loai_ct,
    ten_loai_ct: pc.ten_loai_ct,
    ten_nguoi_nop_nhan: pc.ten_nguoi_nhan,
    ngay_ct: pc.ngay_ct,
    ngay_lap_phieu: pc.ngay_lap_phieu,
    ten_pttt: pc.ten_pttt,
    dien_giai: pc.dien_giai,
    gia_tri: pc.gia_tri,
    tien: -pc.gia_tri,
  });
});
phieuChiSchema.post('updateOne', async function () {
  const pc = this.getUpdate().$set;
  await soQuyModel.updateOne(
    { ma_ct: pc.ma_ct },
    {
      ten_nguoi_nop_nhan: pc.ten_nguoi_nhan,
      ngay_ct: pc.ngay_ct,
      ngay_lap_phieu: pc.ngay_lap_phieu,
      ten_pttt: pc.ten_pttt,
      dien_giai: pc.dien_giai,
      gia_tri: pc.gia_tri,
      tien: -pc.gia_tri,
    }
  );
});
module.exports = mongoose.model('PhieuChi', phieuChiSchema);
