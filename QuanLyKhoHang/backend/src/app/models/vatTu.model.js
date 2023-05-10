const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const productSchema = new mongoose.Schema(
  {
    ma_vt: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_vt: {
      type: String,
      required: true,
      index: true,
    },
    barcode: {
      type: String,
      default: "",
    },
    ten_tat: {
      type: String,
      default: "",
    },
    ma_nvt: {
      type: String,
      default: "",
    },
    ten_nvt: {
      type: String,
      default: "",
    },
    ma_dvt: {
      type: String,
      default: "",
    },
    ten_dvt: {
      type: String,
      default: "",
    },
    xuat_xu: {
      type: String,
      default: "",
    },
    gia_von: {
      type: Number,
      default: 0,
    },
    gia_ban_le: {
      type: Number,
      default: 0,
    },
    ds_vt_cung_loai: {
      type: [String],
      default: null,
    },
    mo_ta: {
      type: String,
      default: "",
    },
    ds_thuoc_tinh: {
      type: [
        {
          ten_thuoc_tinh: {
            type: String,
            default: "",
          },
          gia_tri: {
            type: String,
            default: "",
          },
        },
      ],
      default: null,
    },
    theo_doi_lo: {
      type: Boolean,
      default: false,
    },
    hinh_anh1: {
      type: String,
      default: "",
    },
    hinh_anh2: {
      type: String,
      default: "",
    },
    hinh_anh3: {
      type: String,
      default: "",
    },
    // vat tu cung loai start
    ma_vt_cung_loai: {
      type: String,
      default: "",
    },
    ten_dvt_quy_doi: {
      type: String,
      default: "",
    },
    so_luong_quy_doi: {
      type: Number,
      default: 0,
    },
    gia_ban_quy_doi: {
      type: Number,
      default: 0,
    },
    // vat tu cung loai end
    createdBy: {
      type: String,
      default: "",
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "vat_tu" }
);

productSchema.index(
  { ma_vt: "text", ten_vt: "text" },
  { default_language: "none" }
);
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("VatTu", productSchema);
