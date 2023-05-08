const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("../models/soKho.model");
const chungTuModel = require("./chungTu.model");
const createError = require("http-errors");
const { generateRandomCode } = require("../../utils/myUtil");

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
      default: "",
    },
    ten_kho: {
      type: String,
      required: true,
      default: "",
    },
    ma_loai_ct: {
      type: String,
      default: "",
    },
    ten_loai_ct: {
      type: String,
      default: "",
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
      default: "",
    },
    ten_ncc: {
      type: String,
      default: "",
    },
    tong_tien_nhap: {
      type: Number,
      default: 0,
    },
    dien_giai: {
      type: String,
      default: "",
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
            default: "",
          },
          ten_dvt: {
            type: String,
            default: "",
          },
          ma_lo: {
            type: String,
            default: "",
          },
          ten_lo: {
            type: String,
            default: "",
          },
          ma_vt: {
            type: String,
            default: "",
          },
          ten_vt: {
            type: String,
            default: "",
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
      default: "",
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "phieu_nhap_kho" }
);

const generateUniqueValue = async () => {
  let maChungTu = generateRandomCode(6, "PNK");
  const doc = await mongoose
    .model("PhieuNhapKho", phieuNhapKhoSchema)
    .findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

// Middleware tinh tong tien nhap kho
phieuNhapKhoSchema.pre("save", async function (next) {
  try {
    const pnk = this;
    const maChungTu = await generateUniqueValue();
    pnk.ma_ct = maChungTu;
    pnk.ngay_ct = new Date();
    const details = pnk.details || [];
    // tính tổng tiền nhập dựa trên các sản phẩm nhập
    const tong_tien_nhap =
      pnk.tong_tien_nhap ||
      details.reduce((sum, detail) => {
        return sum + detail.tien_nhap;
      }, 0);
    pnk.tong_tien_nhap = tong_tien_nhap;
    // lưu tồn kho cho các sản phẩm
    const chungTu = await chungTuModel.findOne({ ma_ct: "pnk" });
    if (!chungTu) {
      return next(createError(404, `Chứng từ 'pnk' không tồn tại`));
    }
    pnk.ma_loai_ct = chungTu.ma_ct;
    pnk.ten_loai_ct = chungTu.ten_ct;
    details.forEach(async (detail) => {
      const tonKho = await soKhoModel
        .findOne({
          ma_vt: detail.ma_vt,
          ma_kho: pnk.ma_kho,
          ma_loai_ct: { $in: ["pnk", "pkk", "pxk", "pdck"] },
        })
        .sort({ ngay_ct: -1 });
      const soKho = {
        ma_ct: pnk.ma_ct,
        ma_loai_ct: chungTu.ma_ct,
        ten_loai_ct: chungTu.ten_ct,
        ngay_ct: pnk.ngay_ct,
        ma_kho: pnk.ma_kho,
        ten_kho: pnk.ten_kho,
        ma_lo: detail.ma_lo,
        ten_lo: detail.ten_lo,
        ma_vt: detail.ma_vt,
        ten_vt: detail.ten_vt,
        sl_nhap: detail.so_luong_nhap,
        ton_dau: !!tonKho ? tonKho.ton_cuoi : 0,
        ton_cuoi: (tonKho?.ton_cuoi || 0) + detail.so_luong_nhap,
      };
      await soKhoModel.create(soKho);
    });
    next();
  } catch (error) {
    return next(error);
  }
});
phieuNhapKhoSchema.pre("updateOne", async function (next) {
  // không cập nhật kho
  // không cập nhật hàng hóa
  let isError = false;
  try {
    const pnk = this._update;
    const { ma_kho, ma_ct } = pnk;
    const doc = await mongoose
      .model("PhieuNhapKho", phieuNhapKhoSchema)
      .findOne({ ma_ct });
    if (!doc) {
      return next(createError(404, `Mã chứng từ '${ma_ct}' không tồn tại`));
    }
    if (doc.ma_kho !== ma_kho) {
      return next(createError(400, `Không được đổi kho`));
    }
    if (pnk.details.length !== doc.details.length) {
      return next(createError(400, `Không được thêm hay xóa hàng hóa đã nhập`));
    }
    pnk.details.forEach((item, index) => {
      if (item._id !== doc.details[index]._id.toString()) {
        isError = true;
        return next(
          createError(400, `Không được thêm hay xóa hàng hóa đã nhập`)
        );
      }
      if (item.ma_vt !== doc.details[index].ma_vt) {
        isError = true;
        return next(createError(400, `Không được chỉnh sửa hàng hóa`));
      }
      if (item.so_luong_nhap !== doc.details[index].so_luong_nhap) {
        isError = true;
        return next(createError(400, `Không được chỉnh sửa số lượng nhập kho`));
      }
      const { ma_vt, ten_vt, ma_dvt, ten_dvt, so_luong_nhap, ...fields } = item;
      item = { ...item, ...fields };
    });
  } catch (error) {
    return next(error);
  } finally {
    if (!isError) {
      next();
    }
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
