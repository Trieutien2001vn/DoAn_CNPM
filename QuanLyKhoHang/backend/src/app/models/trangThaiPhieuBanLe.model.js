const mongoose = require('mongoose');

const trangThaiPhieuBanLeSchema = new mongoose.Schema(
  {
    ma_trang_thai: {
      type: Number,
      required: true,
      unique: true,
    },
    ten_trang_thai: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, collection: 'trang_thai_pbl' }
);
module.exports = mongoose.model('TrangThaiPhieuBanLe', trangThaiPhieuBanLeSchema);
