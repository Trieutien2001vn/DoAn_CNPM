const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const tonKhoSchema = new mongoose.Schema(
  {
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
    ton_thuc_te: {
      type: Number,
      default: 0,
    },
    ton_kha_dung_ban: {
      type: Number,
      default: 0,
    },
    ngay_kiem_kho: {
      type: Date,
      default: "",
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
  { timestamps: true, collection: "ton_kho" }
);

tonKhoSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("TonKho", tonKhoSchema);
