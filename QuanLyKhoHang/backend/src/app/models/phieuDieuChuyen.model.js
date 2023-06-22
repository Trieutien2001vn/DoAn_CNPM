const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const soKhoModel = require('./soKho.model');
const chungTuModel = require('../models/chungTu.model');
const phieuNhapKhoModel = require('../models/phieuNhapKho.model');
const phieuXuatKhoModel = require('../models/phieuXuatKho.model');
const tonKhoController = require('../controllers/tonkho.controller');
const {
  generateRandomCode,
  generateUniqueValueUtil,
  getQuyByMonth,
} = require('../../utils/myUtil');
const createHttpError = require('http-errors');
const vatTuModel = require('./vatTu.model');

const phieuDieuChuyenSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      required: true,
      unique: true,
    },
    ma_ct: {
      type: String,
    },
    ma_loai_ct: {
      type: String,
    },
    ten_loai_ct: {
      type: String,
    },
    ma_kho_tu: {
      type: String,
      required: true,
    },
    ten_kho_tu: {
      type: String,
      required: true,
    },
    ma_kho_den: {
      type: String,
      required: true,
    },
    ten_kho_den: {
      type: String,
      required: true,
    },
    ma_vt: {
      type: String,
      required: true,
    },
    ten_vt: {
      type: String,
      required: true,
    },
    ma_lo_tu: {
      type: String,
      default: '',
    },
    ten_lo_tu: {
      type: String,
      default: '',
    },
    ma_lo_den: {
      type: String,
      default: '',
    },
    ten_lo_den: {
      type: String,
      default: '',
    },
    sl_chuyen: {
      type: Number,
      default: 0,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ngay_xuat_kho: {
      type: Date,
      default: null,
    },
    ngay_nhap_kho: {
      type: Date,
      default: null,
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
  { timestamps: true, collection: 'phieu_dieu_chuyen' }
);

const generateUniqueValue = async () => {
  let maChungTu = generateRandomCode(6, 'pxdc');
  const doc = await mongoose
    .model('PhieuDieuChuyen', phieuDieuChuyenSchema)
    .findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

phieuDieuChuyenSchema.pre('save', async function (next) {
  try {
    const pdc = this;
    // kiểm tra vật tư
    const vatTu = await vatTuModel.findOne({ ma_vt: pdc.ma_vt });
    if (!vatTu) {
      return next(createHttpError(404, 'Hàng hóa không tồn tại'));
    }
    if (vatTu.theo_doi_lo) {
      return next(
        createHttpError(400, 'Hàng hóa theo dõi lô không thể điều chuyển')
      );
    }
    // kiểm tra tồn kho
    const tonKho = await tonKhoController.getInventoryOnStoreHelper({
      ma_vt: pdc.ma_vt,
      ma_kho: pdc.ma_kho_tu,
    });
    if (tonKho.ton_kho < pdc.sl_chuyen) {
      return next(
        createHttpError(
          400,
          `Hàng hóa '${pdc.ten_vt}' chỉ tồn '${tonKho.ton_kho}' ở kho '${pdc.ten_kho_tu}'`
        )
      );
    }
    if (pdc.ma_lo_tu) {
      const tonTheoLo = await tonKhoController.getInventoryByConsigmentHelper({
        ma_vt: pdc.ma_vt,
        ma_lo: pdc.ma_lo_tu,
      });
      if (tonTheoLo.ton_kho < pdc.sl_chuyen) {
        return next(
          createHttpError(
            400,
            `Hàng hóa '${pdc.ten_vt}' chỉ tồn '${tonTheoLo.ton_kho}' ở kho '${pdc.ten_kho_tu}'`
          )
        );
      }
    }
    const maChungTu = await generateUniqueValue();
    pdc.ma_ct = maChungTu;
    const chungTu = await chungTuModel.findOne({ ma_ct: 'pxdc' });
    if (chungTu) {
      pdc.ma_loai_ct = chungTu.ma_ct;
      pdc.ten_loai_ct = chungTu.ten_ct;
    }
    return next();
  } catch (error) {
    next(error);
  }
});

phieuDieuChuyenSchema.post('save', async function () {
  const pdc = this;
  const { ma_ct, ma_loai_ct, ten_loai_ct, ma_vt, ten_vt, ngay_ct, sl_chuyen } =
    pdc;
  const ngay = pdc.ngay_ct.getDate();
  const thang = pnk.ngay_ct.getMonth() + 1;
  const nam = pnk.ngay_ct.getFullYear();
  const quy = getQuyByMonth(thang);
  const gio = pnk.ngay_ct.getHours();
  const phut = pnk.ngay_ct.getMinutes();
  const giay = pnk.ngay_ct.getSeconds();
  // lưu vào số kho
  const baseData = {
    ma_ct,
    ma_loai_ct,
    ten_loai_ct,
    ma_vt,
    ten_vt,
    ngay_ct,
    nam,
    quy,
    thang,
    ngay,
    gio,
    phut,
    giay,
  };
  await soKhoModel.create(
    {
      ...baseData,
      ma_kho: pdc.ma_kho_tu,
      ten_kho: pdc.ten_kho_tu,
      ma_lo: pdc.ma_lo_tu,
      ten_lo: pdc.ten_lo_tu,
      sl_xuat: sl_chuyen,
      so_luong: -sl_chuyen,
    },
    {
      ...baseData,
      ma_kho: pdc.ma_kho_den,
      ten_kho: pdc.ten_kho_den,
      ma_lo: pdc.ma_lo_den,
      ten_lo: pdc.ten_lo_den,
      sl_nhap: sl_chuyen,
      so_luong: sl_chuyen,
    }
  );
});
phieuDieuChuyenSchema.pre('updateMany', async function (next) {
  try {
    try {
      return next(
        createHttpError(400, 'Không thể xóa, phiếu điều chuyển đã lưu vào sổ')
      );
    } catch (error) {
      next(error);
    }
  } catch (error) {
    return next(error);
  }
});
phieuDieuChuyenSchema.pre('deleteMany', async function () {
  try {
    try {
      return next(
        createHttpError(400, 'Không thể xóa, phiếu điều chuyển đã lưu vào sổ')
      );
    } catch (error) {
      next(error);
    }
  } catch (error) {
    return next(error);
  }
});
phieuDieuChuyenSchema.pre('updateOne', async function (next) {
  try {
    return next(
      createHttpError(
        400,
        'Không thể chỉnh sửa, phiếu điều chuyển đã lưu vào sổ'
      )
    );
  } catch (error) {
    next(error);
  }
});
phieuDieuChuyenSchema.post('updateOne', async function () {
  const pxdc = this.getUpdate().$set;
  const {
    ma_ct,
    sl_chuyen,
    ngay_ct,
    ma_kho_tu,
    ten_kho_tu,
    ma_kho_den,
    ten_kho_den,
    ma_lo_den,
    ten_lo_den,
    ma_lo_tu,
    ten_lo_tu,
  } = pxdc;
  // tìm sổ kho với phiếu xuất kho tương ứng
  await soKhoModel.findOneAndUpdate(
    {
      ma_ct: ma_ct,
      ma_loai_ct: 'pxk',
    },
    {
      sl_xuat: sl_chuyen,
      so_luong: -sl_chuyen,
      ngay_ct,
      ma_kho: ma_kho_tu,
      ten_kho: ten_kho_tu,
      ma_lo: ma_lo_tu,
      ten_lo: ten_lo_tu,
    }
  );
  // tìm sổ kho với phiếu nhập kho tương ứng
  await soKhoModel.findOneAndUpdate(
    {
      ma_ct: ma_ct,
      ma_loai_ct: 'pnk',
    },
    {
      sl_nhap: sl_chuyen,
      so_luong: sl_chuyen,
      ngay_ct,
      ma_kho: ma_kho_den,
      ten_kho: ten_kho_den,
      ma_lo: ma_lo_den,
      ten_lo: ten_lo_den,
    }
  );
});

phieuDieuChuyenSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhieuDieuChuyen', phieuDieuChuyenSchema);
