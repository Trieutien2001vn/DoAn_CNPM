const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const phieuBanLeSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      required: true,
      unique: true,
    },
    ma_ct: {
      type: String,
      required: true,
    },
    ma_loai_ct: {
      type: String,
    },
    ten_loai_ct: {
      type: String,
    },
    ma_kho: {
      type: String,
      required: true
    },
    ten_kho: {
      type: String,
      required: true
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ngay_lap_phieu: {
      type: Date,
      default: null,
    },
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
    ma_pttt: {
      type: String,
      default: '',
    },
    ten_pttt: {
      type: String,
      default: '',
    },
    tien_hang: {
      type: Number,
      default: 0,
    },
    ty_le_ck_hd: {
      type: Number,
      default: 0,
    },
    tien_ck_hd: {
      type: Number,
      default: 0,
    },
    tien_ck_sp: {
      type: Number,
      default: 0,
    },
    tong_tien_ck: {
      type: Number,
      default: 0,
    },
    tong_tien: {
      type: Number,
      default: 0,
    },
    tien_thu: {
      type: Number,
      default: 0,
    },
    tien_thoi: {
      type: Number,
      default: 0,
    },
    details: {
      type: [
        {
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
          gia_von: {
            type: Number,
            default: 0,
          },
          gia_ban_le: {
            type: Number,
            default: 0,
          },
          sl_xuat: {
            type: Number,
            default: 0,
          },
          tien_hang: {
            type: Number,
            default: 0,
          },
          ty_le_ck: {
            type: Number,
            default: 0,
          },
          tien_ck: {
            type: Number,
            default: 0,
          },
          tien_ck_phan_bo: {
            type: Number,
            default: 0,
          },
          tong_tien_ck: {
            type: Number,
            default: 0,
          },
          tong_tien: {
            type: Number,
            default: 0,
          },
        },
      ],
      default: [],
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
  { timestamps: true, collection: 'pbl' }
);

phieuBanLeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhieuBanLe', phieuBanLeSchema);
