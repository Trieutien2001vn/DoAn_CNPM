const mongoose = require('mongoose');
const { generateRandomCode, generateUniqueValueUtil} = require("../../utils/myUtil");
const mongooseDelete = require('mongoose-delete');

const phieuChiSchema = new mongoose.Schema(
  {
      ma_phieu: {
        type: String,
        default:'',
        unique: true,
      },
      ma_ct: {
        type: String,
       default:'',
      },
      ma_nhom_nguoi_nhan: {
        type: String,
        required: true,
      },
      ten_nhom_nguoi_nhan: {
        type: String,
       require
      },
      ma_nguoi_nhan: {
        type: String,
        default: ''
      },
      ten_nguoi_nhan: {
        type: String,
        default: ''
      },
      ma_loai: {
        type: String,
        required: true,
      },
      ten_loai: {
        type: String,
        default:'',
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
        default:''
      },
      ten_pttt: {
        type: String,
         default:'',
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
  { ma_phieu: "text",ma_nhom_nguoi_nhan:"text",ten_nhom_nguoi_nhan:"text"},
  { default_language: "none" }
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
    const pc= this;
    const maPhieu = await generateUniqueValueUtil({maDm: 'PC',model:mongoose.model('PhieuChi', phieuChiSchema),compareKey:'ma_phieu'});
    const maChungTu = await generateUniqueValueUtil({maDm: 'CT',model:mongoose.model('PhieuChi', phieuChiSchema),compareKey:'ma_ct'});
    pc.ma_phieu = maPhieu;
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

module.exports = mongoose.model('PhieuChi', phieuChiSchema);
