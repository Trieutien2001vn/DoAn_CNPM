const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const donViTinhSchema = new mongoose.Schema(
  {
    ma_dvt: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ten_dvt: {
      type: String,
      required: true,
      index: true,
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
  { timestamps: true, collection: "don_vi_tinh" }
);
donViTinhSchema.index(
  { ma_dvt: "text", ten_dvt: "text" },
  { default_language: "none" }
);
donViTinhSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("DonViTinh", donViTinhSchema);
