const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("./soKho.model");
const chungTuModel = require("./chungTu.model");
const loModel = require("./lo.model");
const createError = require("http-errors");
const { generateRandomCode } = require("../../utils/myUtil");
const tonKhoController = require("../controllers/tonkho.controller");

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
    ngay_xuat_hang: {
      type: Date,
      default: null,
    },
    tong_tien_xuat: {
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
          gia_ban_le: {
            type: Number,
            default: 0,
          },
          gia_xuat: {
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
      default: "",
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "phieu_xuat_kho" }
);

const generateUniqueValue = async (model) => {
  let maChungTu = generateRandomCode(6, "PXK");
  const doc = await model.findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

// Middleware tinh tong tien nhap kho
phieuXuatKhoSchema.pre("save", async function (next) {
  try {
    let error;
    const pxk = this;
    const maChungTu = await generateUniqueValue(
      mongoose.model("PhieuXuatKho", phieuXuatKhoSchema)
    );
    pxk.ma_ct = maChungTu;
    pxk.ngay_ct = new Date();
    const details = pxk.details || [];
    // tính tổng tiền nhập dựa trên các sản phẩm nhập
    const tong_tien_xuat =
      pxk.tong_tien_xuat ||
      details.reduce((sum, detail) => {
        return sum + detail.tien_xuat;
      }, 0);
    pxk.tong_tien_xuat = tong_tien_xuat;
    // lưu tồn kho cho các sản phẩm
    const chungTu = await chungTuModel.findOne({ ma_ct: "pxk" });
    if (!chungTu) {
      return next(createError(404, `Chứng từ 'pxk' không tồn tại`));
    }
    pxk.ma_loai_ct = chungTu.ma_ct;
    pxk.ten_loai_ct = chungTu.ten_ct;

    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const tonKhoResp = await tonKhoController.getInventoryOnStoreHelper({
        ma_vt: detail.ma_vt,
        ma_kho: pxk.ma_kho,
      });
      console.log({ tonKhoResp });
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

phieuXuatKhoSchema.post("save", async function (next) {
  try {
    const pxk = this;
    pxk.details.forEach(async (detail) => {
      const soKho = {
        ma_ct: pxk.ma_ct,
        ma_loai_ct: pxk.ma_loai_ct,
        ten_loai_ct: pxk.ten_loai_ct,
        ngay_ct: pxk.ngay_ct,
        ma_kho: pxk.ma_kho,
        ten_kho: pxk.ten_kho,
        ma_lo: detail.ma_lo,
        ten_lo: detail.ten_lo,
        ma_vt: detail.ma_vt,
        ten_vt: detail.ten_vt,
        sl_xuat: detail.so_luong_xuat,
        so_luong: -detail.so_luong_xuat,
      };
      await soKhoModel.create(soKho);
    });
  } catch (error) {
    next(error);
  }
});

phieuXuatKhoSchema.pre("updateOne", async function (next) {
  // không cập nhật kho
  // không cập nhật hàng hóa
  let isError = false;
  try {
    const pxk = this._update;
    const { ma_kho, ma_ct } = pxk;
    const doc = await this.model.findOne({ ma_ct });
    if (!doc) {
      return next(createError(404, `Mã chứng từ '${ma_ct}' không tồn tại`));
    }
    if (doc.ma_kho !== ma_kho) {
      return next(createError(400, `Không được đổi kho`));
    }
    if (pxk.details.length !== doc.details.length) {
      return next(createError(400, `Không được thêm hay xóa hàng hóa đã xuất`));
    }
    pxk.details.forEach(async (item, index) => {
      if (item._id !== doc.details[index]._id.toString()) {
        isError = true;
        return next(
          createError(400, `Không được thêm hay xóa hàng hóa đã xuất`)
        );
      }
      if (item.ma_vt !== doc.details[index].ma_vt) {
        isError = true;
        return next(createError(400, `Không được chỉnh sửa hàng hóa`));
      }
      if (
        item.so_luong_xuat !== doc.details[index].so_luong_xuat ||
        item.ma_lo !== doc.details[index].ma_lo
      ) {
        await soKhoModel.updateOne(
          { ma_ct: pxk.ma_ct, ma_vt: item.ma_vt },
          {
            sl_xuat: item.so_luong_xuat,
            so_luong: -item.so_luong_xuat,
            ma_lo: item.ma_lo,
            ten_lo: item.ten_lo,
          }
        );
      }
      const { ma_vt, ten_vt, ma_dvt, ten_dvt, ...fields } = item;
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
phieuXuatKhoSchema.pre("updateMany", async function (next) {
  try {
    const pxk = this;
    const _update = pxk._update;
    const filter = pxk.getFilter();
    if (_update.deleted) {
      const phieuXuatKhos = await this.model
        .find(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuXuatKhos.map((item) => item.ma_ct);
      await soKhoModel.delete({ ma_ct: { $in: maCts } });
    } else {
      const phieuXuatKhos = await this.model
        .findDeleted(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuXuatKhos.map((item) => item.ma_ct);
      await soKhoModel.restore({ ma_ct: { $in: maCts } });
    }
  } catch (error) {
    return next(error);
  }
});
phieuXuatKhoSchema.pre("deleteMany", async function () {
  try {
    const pxk = this;
    const filter = pxk.getFilter();
    const phieuXuatKhos = await this.model
      .findDeleted(filter)
      .select(["-_id", "ma_ct"]);
    const maCts = phieuXuatKhos.map((item) => item.ma_ct);
    await soKhoModel.deleteMany({ ma_ct: { $in: maCts } });
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
