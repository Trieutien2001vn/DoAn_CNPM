const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("../models/soKho.model");
const chungTuModel = require("./chungTu.model");
const loModel = require("./lo.model");
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
  let maChungTu = generateRandomCode(6, "pnk");
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
    // lưu tồn kho cho các sản phẩm
    const chungTu = await chungTuModel.findOne({ ma_ct: "pnk" });
    if (!chungTu) {
      return next(createError(404, `Chứng từ 'pnk' không tồn tại`));
    }
    pnk.ma_loai_ct = chungTu.ma_ct;
    pnk.ten_loai_ct = chungTu.ten_ct;
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
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
phieuNhapKhoSchema.post("save", async function () {
  const pnk = this;
  pnk.details.forEach(async (detail) => {
    const soKho = {
      ma_ct: pnk.ma_ct,
      ma_loai_ct: pnk.ma_loai_ct,
      ten_loai_ct: pnk.ten_loai_ct,
      ngay_ct: pnk.ngay_ct,
      ma_kho: pnk.ma_kho,
      ten_kho: pnk.ten_kho,
      ma_lo: detail.ma_lo,
      ten_lo: detail.ten_lo,
      ma_vt: detail.ma_vt,
      ten_vt: detail.ten_vt,
      sl_nhap: detail.so_luong_nhap,
      so_luong: detail.so_luong_nhap,
      gia_von: detail.gia_von,
    };
    await soKhoModel.create(soKho);
  });
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
    pnk.details.forEach(async (item, index) => {
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
      if (
        item.so_luong_nhap !== doc.details[index].so_luong_nhap ||
        item.ma_lo !== doc.details[index].ma_lo
      ) {
        await soKhoModel.updateOne(
          { ma_ct: pnk.ma_ct, ma_vt: item.ma_vt },
          {
            sl_nhap: item.so_luong_nhap,
            so_luong: item.so_luong_nhap,
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
phieuNhapKhoSchema.post("updateMany", async function (next) {
  try {
    const pnk = this;
    const _update = pnk.getUpdate();
    const filter = pnk.getFilter();
    if (_update.$set.deleted) {
      const phieuNhapKhos = await this.model
        .findDeleted(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuNhapKhos.map((item) => item.ma_ct);
      await soKhoModel.delete({ ma_ct: { $in: maCts } });
    } else {
      const phieuNhapKhos = await this.model
        .find(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuNhapKhos.map((item) => item.ma_ct);
      await soKhoModel.restore({ ma_ct: { $in: maCts } });
    }
  } catch (error) {
    return next(error);
  }
});
phieuNhapKhoSchema.pre("deleteMany", async function () {
  try {
    const pnk = this;
    const filter = pnk.getFilter();
    const phieuNhapKhos = await this.model
      .findDeleted(filter)
      .select(["-_id", "ma_ct"]);
    const maCts = phieuNhapKhos.map((item) => item.ma_ct);
    await soKhoModel.deleteMany({ ma_ct: { $in: maCts } });
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
