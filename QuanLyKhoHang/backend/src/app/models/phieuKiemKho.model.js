const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soKhoModel = require("./soKho.model");
const chungTuModel = require("../models/chungTu.model");
const loModel = require("../models/lo.model");
const tonKhoController = require("../controllers/tonkho.controller");
const { generateRandomCode } = require("../../utils/myUtil");
const createHttpError = require("http-errors");

const phieuKiemKhoSchema = new mongoose.Schema(
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
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
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
    ma_lo: {
      type: String,
      default: "",
    },
    ten_lo: {
      type: String,
      default: "",
    },
    ton_kho_so_sach: {
      type: Number,
      default: 0,
    },
    ton_kho_thuc_te: {
      type: Number,
      default: 0,
    },
    chenh_lech: {
      type: Number,
      default: 0,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ngay_kiem_hang: {
      type: Date,
      default: null,
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
  { timestamps: true, collection: "phieu_kiem_kho" }
);

const generateUniqueValue = async () => {
  let maChungTu = generateRandomCode(6, "pkk");
  const doc = await mongoose
    .model("PhieuKiemKho", phieuKiemKhoSchema)
    .findOne({ ma_ct: maChungTu });
  if (doc) {
    return await generateUniqueValue();
  } else {
    return maChungTu;
  }
};

phieuKiemKhoSchema.pre("save", async function (next) {
  try {
    const pkk = this;
    let error;
    const tonKho = await tonKhoController.getInventoryOnStoreHelper({
      ma_vt: pkk.ma_vt,
      ma_kho: pkk.ma_kho,
    });
    if (tonKho.ton_kho <= 0) {
      error = createHttpError(
        400,
        `Hàng hóa '${pkk.ten_vt}' không có tồn kho trong kho '${pkk.ten_kho}'`
      );
    }
    if (pkk.ma_lo) {
      const loExisted = await loModel.findOne({
        ma_lo: pkk.ma_lo,
        ma_vt: pkk.ma_vt,
        ma_kho: pkk.ma_kho,
      });
      if (!loExisted) {
        error = createHttpError(
          404,
          `Lô '${pkk.ten_lo}' với hàng hóa '${pkk.ten_vt}' và kho '${pkk.ten_kho}' không tồn tại`
        );
      }
    }
    if (error) {
      return next(error);
    } else {
      const maCt = await generateUniqueValue();
      pkk.ma_ct = maCt;
      const chungTu = await chungTuModel.findOne({ ma_ct: "pkk" });
      pkk.ma_loai_ct = chungTu.ma_ct;
      pkk.ten_loai_ct = chungTu.ten_ct;
      pkk.chenh_lech = (pkk.ton_kho_thuc_te || 0) - (pkk.ton_kho_so_sach || 0);
      next();
    }
  } catch (error) {
    next(error);
  }
});

phieuKiemKhoSchema.post("save", async function () {
  /*
    chênh lệnh = số lượng thực tế - số lượng sổ sách
    Lưu vào sổ kho với trường số lượng = chênh lệch
  */
  const pkk = this;
  await soKhoModel.create({
    ma_ct: pkk.ma_ct,
    ma_loai_ct: pkk.ma_loai_ct,
    ten_loai_ct: pkk.ten_loai_ct,
    ngay_ct: pkk.ngay_ct,
    ma_kho: pkk.ma_kho,
    ten_kho: pkk.ten_kho,
    ma_vt: pkk.ma_vt,
    ten_vt: pkk.ten_vt,
    so_luong: pkk.chenh_lech,
    ma_lo: pkk.ma_lo,
    ten_lo: pkk.ten_lo,
  });
});
phieuKiemKhoSchema.post("updateMany", async function (next) {
  try {
    const pkk = this;
    const _update = pkk.getUpdate();
    const filter = pkk.getFilter();
    if (_update.$set.deleted) {
      const phieuKiemKhos = await this.model
        .findDeleted(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuKiemKhos.map((item) => item.ma_ct);
      await soKhoModel.delete({ ma_ct: { $in: maCts } });
    } else {
      const phieuKiemKhos = await this.model
        .find(filter)
        .select(["-_id", "ma_ct"]);
      const maCts = phieuKiemKhos.map((item) => item.ma_ct);
      await soKhoModel.restore({ ma_ct: { $in: maCts } });
    }
  } catch (error) {
    return next(error);
  }
});
phieuKiemKhoSchema.pre("deleteMany", async function () {
  try {
    const pkk = this;
    const filter = pkk.getFilter();
    const phieuKiemKhos = await this.model
      .findDeleted(filter)
      .select(["-_id", "ma_ct"]);
    const maCts = phieuKiemKhos.map((item) => item.ma_ct);
    await soKhoModel.deleteMany({ ma_ct: { $in: maCts } });
  } catch (error) {
    return next(error);
  }
});
phieuKiemKhoSchema.pre("updateOne", async function () {
  const {
    ma_ct,
    ma_kho,
    ten_kho,
    ma_lo,
    ten_lo,
    ma_vt,
    ten_vt,
    ngay_ct,
    ton_kho_thuc_te,
    ton_kho_so_sach,
  } = this.getUpdate();
  await soKhoModel.updateOne(
    { ma_ct },
    {
      ma_kho,
      so_luong: (ton_kho_thuc_te || 0) - (ton_kho_so_sach || 0),
      ten_kho,
      ma_lo,
      ten_lo,
      ma_vt,
      ten_vt,
      ngay_ct,
    }
  );
});

phieuKiemKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("PhieuKiemKho", phieuKiemKhoSchema);
