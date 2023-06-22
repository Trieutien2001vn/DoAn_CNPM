const mongoose = require('mongoose');
const { generateRandomCode, generateUniqueValueUtil} = require("../../utils/myUtil");
const mongooseDelete = require('mongoose-delete');

const phieuThuSchema = new mongoose.Schema(
  {
      ma_phieu: {
        type: String,
        required: true,
        unique: true,
      },
      ma_ct: {
        type: String,
       default:'',
      },
      ma_nhom_nguoi_nop: {
        type: String,
        required: true,
      },
      ten_nhom_nguoi_nop: {
        type: String,
       require
      },
      ma_nguoi_nop: {
        type: String,
        default: ''
      },
      ten_nguoi_nop: {
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
  { timestamps: true, collection: 'phieu_thu' }
);
phieuThuSchema.index(
  { ma_phieu: "text",ma_nhom_nguoi_nop:"text",ten_nhom_nguoi_nop:"text"},
  { default_language: "none" }
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
    const maChungTu = await generateUniqueValueUtil(
      mongoose.model('Phiếu Thu', phieuThuSchema)
    );.
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

module.exports = mongoose.model('PhieuThu', phieuThuSchema);
