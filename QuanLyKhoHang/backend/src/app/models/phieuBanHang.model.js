const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { generateUniqueValueUtil } = require('../../utils/myUtil');
const chungTuModel = require('./chungTu.model');
const vatTuModel = require('./vatTu.model');
const createHttpError = require('http-errors');

const phieuBanHangSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      unique: true,
    },
    ma_ct: {
      type: String,
      default: '',
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
    ghi_chu: {
      type: String,
      default: '',
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
          ma_lo: {
            type: String,
            default: '',
          },
          ten_lo: {
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
          ghi_chu: {
            type: String,
            default: '',
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
  { timestamps: true, collection: 'phieu_ban_hang' }
);

phieuBanHangSchema.pre('save', async function (next) {
  try {
    const pbh = this;
    if (!pbh.ma_phieu) {
      const maPhieu = await generateUniqueValueUtil({
        maDm: 'pbh',
        model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
        compareKey: 'ma_phieu',
      });
      pbh.ma_phieu = maPhieu;
    }
    const maChungTu = await generateUniqueValueUtil({
      maDm: 'pbh',
      model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
      compareKey: 'ma_ct',
    });
    pbh.ma_ct = maChungTu;
    const chungTu = await chungTuModel.findOne({ ma_ct: 'pbh' });
    pbh.ma_loai_ct = chungTu.ma_ct;
    pbh.ten_loai_ct = chungTu.ten_ct;
    next();
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.post('save', async function () {
 
});
phieuBanHangSchema.pre('updateOne', function (next) {
  try {
    return next(
      createHttpError(400, 'Không thể chỉnh sửa, phiếu bán lẻ đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.pre('updateMany', function (next) {
  try {
    return next(
      createHttpError(400, 'Không thể chỉnh xóa, phiếu bán lẻ đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.pre('deleteMany', function (next) {
  try {
    return next(
      createHttpError(400, 'Không thể chỉnh xóa, phiếu bán lẻ đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});

phieuBanHangSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhieuBanHang', phieuBanHangSchema);
