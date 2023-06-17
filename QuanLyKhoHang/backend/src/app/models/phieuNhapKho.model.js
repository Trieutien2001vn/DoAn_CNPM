const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("../models/soKho.model");
const chungTuModel = require("./chungTu.model");
const trangThaiModel = require('../models/trangThai.model');
const loModel = require('./lo.model');
const tonKhoController = require('../controllers/tonkho.controller');
const createError = require('http-errors');
const { generateRandomCode, getQuyByMonth } = require('../../utils/myUtil');
const vatTuModel = require('./vatTu.model');
const soCaiModel = require("./soCai.model");

const phieuNhapKhoSchema = new mongoose.Schema(
  {
    ma_ct: {
      type: String,
    },
    ma_phieu: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ma_kho: {
      type: String,
      required: true,
      default: '',
    },
    ten_kho: {
      type: String,
      required: true,
      default: '',
    },
    ma_loai_ct: {
      type: String,
      default: '',
    },
    ten_loai_ct: {
      type: String,
      default: '',
    },
    ngay_ct: {
      type: Date,
      default: new Date(),
    },
    ngay_nhap_hang: {
      type: Date,
      default: null,
    },
    ma_ncc: {
      type: String,
      default: '',
    },
    ten_ncc: {
      type: String,
      default: '',
    },
    tong_tien_nhap: {
      type: Number,
      default: 0,
    },
    dien_giai: {
      type: String,
      default: '',
    },
    ma_trang_thai: {
      type: Number,
      default: 1,
    },
    ten_trang_thai: {
      type: String,
      default: '',
    },
    details: {
      type: [
        {
          gia_von: {
            type: Number,
            default: 0,
          },
          ma_dvt: {
            type: String,
            default: '',
          },
          ten_dvt: {
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
          ma_vt: {
            type: String,
            default: '',
          },
          ten_vt: {
            type: String,
            default: '',
          },
          ma_nvt: {
            type: String,
            default: '',
          },
          ten_nvt: {
            type: String,
            default: '',
          },
          so_luong_nhap: {
            type: Number,
            default: 0,
          },
          tien_nhap: {
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
  { timestamps: true, collection: 'phieu_nhap_kho' }
);

const generateUniqueValue = async () => {
  let maChungTu = generateRandomCode(6, 'pnk');
  const doc = await mongoose
    .model('PhieuNhapKho', phieuNhapKhoSchema)
    .findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

// Middleware tinh tong tien nhap kho
phieuNhapKhoSchema.pre('save', async function (next) {
  try {
    let error;
    const pnk = this;
    const maChungTu = await generateUniqueValue();
    pnk.ma_ct = maChungTu;
    const details = pnk.details || [];
    // tính tổng tiền nhập dựa trên các sản phẩm nhập
    const tong_tien_nhap =
      pnk.tong_tien_nhap ||
      details.reduce((sum, detail) => {
        return sum + detail.tien_nhap;
      }, 0);
    pnk.tong_tien_nhap = tong_tien_nhap;
    const trangThai = await trangThaiModel.findOne({ ma_trang_thai: 1 });
    pnk.ma_trang_thai = trangThai?.ma_trang_thai || 1;
    pnk.ten_trang_thai = trangThai?.ten_trang_thai || '';
    // lưu tồn kho cho các sản phẩm
    const chungTu = await chungTuModel.findOne({ ma_ct: 'pnk' });
    if (!chungTu) {
      return next(createError(404, `Chứng từ 'pnk' không tồn tại`));
    }
    pnk.ma_loai_ct = chungTu.ma_ct;
    pnk.ten_loai_ct = chungTu.ten_ct;
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
      if (!vatTu) {
        error = createError(`Hàng hóa '${detail.ten_vt}' không tồn tại.`);
        break;
      }
      if (detail.ma_lo) {
        const loValidate = await loModel.findOne({
          ma_vt: detail.ma_vt,
          ma_kho: pnk.ma_kho,
          ma_lo: detail.ma_lo,
        });
        if (!loValidate) {
          error = createError(
            404,
            `Lô '${detail.ma_lo}' với hàng hóa '${detail.ma_vt}' và kho '${pnk.ma_kho}' không tồn tại`
          );
          break;
        }
      }
      detail.ma_nvt = vatTu.ma_nvt;
      detail.ten_nvt = vatTu.ten_nvt;
    }
    if (error) {
      return next(error);
    } else {
      next();
    }
  } catch (error) {
    return next(error);
  }
});
/* 
Tính giá vốn trung bình

Theo phương pháp tính này, mỗi lần nhập hàng thì giá vốn sẽ được tính lại theo công thức:

MAC = ( A + B ) / C

Với:

MAC: Giá vốn của sản phẩm tính theo bình quân tức thời
A: Giá trị kho hiện tại trước nhập = Tồn kho trước nhập * giá MAC trước nhập
B: Giá trị kho nhập mới = Tồn nhập mới * giá nhập kho đã phân bổ chi phí
C: Tổng tồn = Tồn trước nhập + tồn sau nhập

MAC = ton_kho * mac + nhap_kho * gia von / ton_kho + nhap_kho
*/
const caculateGiaVon = ({ tonKho = 0, MAC = 0, nhapKho = 0, giaVon = 0 }) => {
  const newMAC = (tonKho * MAC + nhapKho * giaVon) / (tonKho + nhapKho);
  return Math.round(newMAC);
};
phieuNhapKhoSchema.post('save', async function () {
  const pnk = this;
  const ngay = pnk.ngay_ct.getDate();
  const thang = pnk.ngay_ct.getMonth() + 1;
  const nam = pnk.ngay_ct.getFullYear();
  const quy = getQuyByMonth(thang);
  const gio = pnk.ngay_ct.getHours();
  const phut = pnk.ngay_ct.getMinutes();
  const giay = pnk.ngay_ct.getSeconds();
  pnk.details.forEach(async (detail) => {
    const tonKho = await tonKhoController.getTotalInventoryHelper(detail.ma_vt);
    const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
    vatTu.gia_von_cu = vatTu?.gia_von || 0;
    // tinh gia von trung binh
    const MAC = caculateGiaVon({
      tonKho: tonKho?.ton_kho || 0,
      MAC: vatTu.gia_von || 0,
      nhapKho: detail.so_luong_nhap,
      giaVon: detail.gia_von,
    });
    vatTu.gia_von = MAC;
    await vatTu.save();
    // luu vao so kho
    await soKhoModel.create({
      ma_ct: pnk.ma_ct,
      ma_loai_ct: pnk.ma_loai_ct,
      ten_loai_ct: pnk.ten_loai_ct,
      ma_kho: pnk.ma_kho,
      ten_kho: pnk.ten_kho,
      ma_lo: detail.ma_lo,
      ten_lo: detail.ten_lo,
      ma_vt: detail.ma_vt,
      ten_vt: detail.ten_vt,
      sl_nhap: detail.so_luong_nhap,
      so_luong: detail.so_luong_nhap,
      ma_ncc: pnk.ma_ncc,
      ma_ncc: pnk.ten_ncc,
      ngay_ct: pnk.ngay_ct,
      nam,
      thang,
      ngay,
      quy,
      gio,
      phut,
      giay,
    });
    // luu vao so cai
    await soCaiModel.create({
      ma_ct: pnk.ma_ct,
      ma_loai_ct: pnk.ma_loai_ct,
      ten_loai_ct: pnk.ten_loai_ct,
      ma_kho: pnk.ma_kho,
      ten_kho: pnk.ten_kho,
      ngay_ct: pnk.ngay_ct,
      nam,
      thang,
      ngay,
      quy,
      gio,
      phut,
      giay,
      ma_vt: detail.ma_vt,
      ten_vt: detail.ten_vt,
      ma_nvt: detail.ma_nvt,
      ten_nvt: detail.ten_nvt,
      ma_nv: '',
      ten_nv: '',
      ma_ncc: pnk.ma_ncc,
      ten_ncc: pnk.ten_ncc,
      sl_nhap: detail.so_luong_nhap,
      tien_hang: detail.tien_nhap,
      tong_tien: detail.tien_nhap,
    })
  });
});
phieuNhapKhoSchema.pre('updateOne', async function (next) {
  try {
    return next(
      createError(400, 'Không thể chỉnh sửa, phiếu nhập kho đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});
phieuNhapKhoSchema.pre('updateMany', function (next) {
  try {
    return next(
      createError(400, 'Không thể xóa, phiếu nhập kho đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});
phieuNhapKhoSchema.pre('deleteMany', async function (next) {
  try {
    return next(
      createError(400, 'Không thể xóa, phiếu nhập kho đã lưu vào sổ')
    );
  } catch (error) {
    return next(error);
  }
});

phieuNhapKhoSchema.index({ ma_phieu: "text" }, { default_language: "none" });
phieuNhapKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("PhieuNhapKho", phieuNhapKhoSchema);
