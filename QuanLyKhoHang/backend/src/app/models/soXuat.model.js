const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const soXuatSchema = new mongoose.Schema(
  {
    ma_ct: {
      type: String,
      required: true,
    },
    ma_loai_ct: {
      type: String,
      required: true,
    },
    ten_loai_ct: {
      type: String,
      required: true,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
      type: String,
      required: true,
    },
    ma_lo: {
      type: String,
    },
    ten_lo: {
      type: String,
    },
    ma_vt: {
      type: String,
      required: true,
    },
    ten_vt: {
      type: String,
      required: true,
    },
    tien_xuat: {
      type: Number,
      default: 0,
    },
    chi_phi: {
      type: Number,
      default: 0,
    },
    loi_nhuan: {
      type: Number,
      default: 0,
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
  { timestamps: true, collection: "so_xuat" }
);

soXuatSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("SoXuat", soXuatSchema);
