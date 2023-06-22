const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("./soKho.model");
const chungTuModel = require("./chungTu.model");
const loModel = require("./lo.model");
const createError = require("http-errors");
const { generateRandomCode, getQuyByMonth } = require("../../utils/myUtil");
const tonKhoController = require("../controllers/tonkho.controller");
const vatTuModel = require("./vatTu.model");

const phieuXuatKhoSchema = new mongoose.Schema(
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
    ma_nv: {
      type: String,
      default: '',
    },
    ten_nv: {
      type: String,
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
    ngay_xuat_hang: {
      type: Date,
      default: null,
    },
    tien_hang: {
      type: Number,
      default: 0
    },
    tong_tien_ck: {
      type: Number,
      default: 0
    },
    tong_tien_xuat: {
      type: Number,
      default: 0,
    },
    dien_giai: {
      type: String,
      default: '',
    },
    details: {
      type: [
        {
          gia_ban_le: {
            type: Number,
            default: 0,
          },
          gia_von: {
            type: Number,
            default: 0,
          },
          gia_xuat: {
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
          so_luong_xuat: {
            type: Number,
            default: 0,
          },
          tien_xuat: {
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
  { timestamps: true, collection: 'phieu_xuat_kho' }
);

const generateUniqueValue = async (model) => {
  let maChungTu = generateRandomCode(6, 'pxk');
  const doc = await model.findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

// Middleware tinh tong tien nhap kho
phieuXuatKhoSchema.pre('save', async function (next) {
  try {
    let error;
    const pxk = this;
    const maChungTu = await generateUniqueValue(
      mongoose.model('PhieuXuatKho', phieuXuatKhoSchema)
    );
    pxk.ma_ct = maChungTu;
    const details = pxk.details || [];
    // tính tổng tiền nhập dựa trên các sản phẩm nhập
    const tong_tien_xuat =
      pxk.tong_tien_xuat ||
      details.reduce((sum, detail) => {
        return sum + detail.tien_xuat;
      }, 0);
    pxk.tong_tien_xuat = tong_tien_xuat;
    // lưu tồn kho cho các sản phẩm
    const chungTu = await chungTuModel.findOne({ ma_ct: 'pxk' });
    if (!chungTu) {
      return next(createError(404, `Chứng từ 'pxk' không tồn tại`));
    }
    pxk.ma_loai_ct = chungTu.ma_ct;
    pxk.ten_loai_ct = chungTu.ten_ct;
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
      if (!vatTu) {
        error = createError(`Hàng hóa '${detail.ten_vt}' không tồn tại.`);
        break;
      }
      const tonKhoResp = await tonKhoController.getInventoryOnStoreHelper({
        ma_vt: detail.ma_vt,
        ma_kho: pxk.ma_kho,
      });
      if (tonKhoResp?.ton_kho < detail.so_luong_xuat) {
        error = createError(
          400,
          `'${detail.ten_vt}' chỉ tồn ${tonKhoResp.ton_kho} ${detail.ten_dvt} ở ${pxk.ten_kho}`
        );
        break;
      }
      if (detail.ma_lo) {
        const loValidate = await loModel.findOne({
          ma_kho: pxk.ma_kho,
          ma_lo: detail.ma_lo,
          ma_vt: detail.ma_vt,
        });
        if (!loValidate) {
          error = createError(
            404,
            `Lô '${detail.ma_lo}' với hàng hóa '${detail.ma_vt}' và kho '${pxk.ma_kho}' không tồn tại`
          );
          break;
        }
      }
      detail.ma_nvt = vatTu.ma_nvt;
      detail.ten_nvt = vatTu.ten_nvt;
      detail.gia_von = vatTu.gia_von;
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

phieuXuatKhoSchema.post('save', async function (next) {
  try {
    const pxk = this;
    const ngay = pxk.ngay_ct.getDate();
    const thang = pxk.ngay_ct.getMonth() + 1;
    const nam = pxk.ngay_ct.getFullYear();
    const quy = getQuyByMonth(thang);
    const gio = pxk.ngay_ct.getHours();
    const phut = pxk.ngay_ct.getMinutes();
    const giay = pxk.ngay_ct.getSeconds();
    pxk.details.forEach(async (detail) => {
      const soKho = {
        ma_ct: pxk.ma_ct,
        ma_loai_ct: pxk.ma_loai_ct,
        ten_loai_ct: pxk.ten_loai_ct,
        ma_kho: pxk.ma_kho,
        ten_kho: pxk.ten_kho,
        ma_lo: detail.ma_lo,
        ten_lo: detail.ten_lo,
        ma_vt: detail.ma_vt,
        ten_vt: detail.ten_vt,
        ma_nvt: detail.ma_nvt,
        ten_nvt: detail.ten_nvt,
        ma_nv: detail.ma_nv,
        ten_nv: detail.ten_nv,
        sl_xuat: detail.so_luong_xuat,
        so_luong: -detail.so_luong_xuat,
        ngay_ct: pxk.ngay_ct,
        nam,
        thang,
        ngay,
        quy,
        gio,
        phut,
        giay,
      };
      await soKhoModel.create(soKho);
      // luu vao so quy
    });
  } catch (error) {
    next(error);
  }
});

phieuXuatKhoSchema.pre('updateOne', async function (next) {
  // không cập nhật kho
  // không cập nhật hàng hóa
  let error;
  try {
    return next(
      createError(400, 'Không thể chỉnh sửa, phiếu xuất kho đã lưu vào sổ')
    );
  } catch (error) {
    return next(error);
  }
});
phieuXuatKhoSchema.pre('updateMany', async function (next) {
  try {
    return next(
      createError(400, 'Không thể xóa, phiếu xuất kho đã lưu vào sổ')
    );
  } catch (error) {
    return next(error);
  }
});
phieuXuatKhoSchema.pre('deleteMany', async function (next) {
  try {
    return next(
      createError(400, 'Không thể xóa, phiếu xuất kho đã lưu vào sổ')
    );
  } catch (error) {
    return next(error);
  }
});

phieuXuatKhoSchema.index({ ma_phieu: "text" }, { default_language: "none" });
phieuXuatKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("PhieuXuatKho", phieuXuatKhoSchema);
