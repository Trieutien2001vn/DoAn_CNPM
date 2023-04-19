const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const tonKhoModel = require("./tonKho.model");
const vatTuModel = require("./vatTu.model");
const chiTietNhapKhoModel = require("./chiTietNhapKho.model");

const phieuNhapKhoSchema = new mongoose.Schema(
  {
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
    ngay_lap_phieu: {
      type: Date,
      default: "",
    },
    ngay_nhap_hang: {
      type: Date,
      default: "",
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
    mo_ta: {
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
          ma_ncc: {
            type: String,
            default: "",
          },
          ten_ncc: {
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

// Middleware tinh tong tien nhap kho
phieuNhapKhoSchema.pre("save", async function (next) {
  try {
    const pnk = this;
    const details = pnk.details || [];
    // tính tổng tiền nhập dựa trên các sản phẩm nhập
    const tong_tien_nhap =
      this.tong_tien_nhap ||
      details.reduce((sum, detail) => {
        return sum + detail.tien_nhap;
      }, 0);
    pnk.tong_tien_nhap = tong_tien_nhap;
    // lưu tồn kho cho các sản phẩm
    details.forEach(async (detail) => {
      await chiTietNhapKhoModel.create(detail);
      const tonKho = await tonKhoModel.findOne({
        ma_kho: pnk.ma_kho,
        ma_vt: detail.ma_vt,
      });
      if (!tonKho) {
        await tonKhoModel.create({
          ma_kho: pnk.ma_kho,
          ten_kho: pnk.ten_kho,
          ma_vt: detail.ma_vt,
          ten_vt: detail.ten_vt,
          ton_thuc_te: detail.so_luong_nhap,
          ton_kha_dung_ban: detail.so_luong_nhap,
          ngay_kiem_kho: new Date(),
          createdBy: pnk.createdBy,
        });
      } else {
        await tonKhoModel.updateOne(
          { ma_kho: pnk.ma_kho, ma_vt: detail.ma_vt },
          {
            ton_thuc_te: tonKho.ton_thuc_te + detail.so_luong_nhap,
            ton_kha_dung_ban: tonKho.ton_kha_dung_ban + detail.so_luong_nhap,
            updatedBy: pnk.createdBy,
          }
        );
      }
      // cập nhật giá vốn của sản phẩm
      const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
      if (detail.gia_von !== vatTu.gia_von) {
        const chiTietNhaps = await chiTietNhapKhoModel.find({
          ma_vt: detail.ma_vt,
        });
        let tongGiaVon = 0;
        let tongNhapKho = 0;
        chiTietNhaps.forEach((ct) => {
          tongGiaVon += ct.gia_von * ct.so_luong_nhap;
          tongNhapKho += ct.so_luong_nhap;
        });
        const giaVonTrungBinh = tongGiaVon / tongNhapKho;
        vatTu.gia_von = giaVonTrungBinh;
        await vatTu.save();
      }
    });

    next();
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
