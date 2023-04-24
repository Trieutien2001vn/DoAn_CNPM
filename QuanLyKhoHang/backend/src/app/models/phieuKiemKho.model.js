const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const phieuKiemKhoSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      required: true,
      unique: true,
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
    ton_kho_so_sach: {
      type: number,
      default: 0,
    },
    ton_kho_thuc_te: {
      type: number,
      default: 0,
    },
    chenh_lech: {
      type: number,
      default: 0,
    },
    can_bang_kho: {
      type: Boolean,
      default: true,
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

phieuKiemKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("PhieuKiemKho", phieuKiemKhoSchema);
