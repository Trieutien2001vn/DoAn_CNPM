const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const phuongThucThanhToanSchema = new mongoose.Schema(
  {
    ma_pttt: {
      type: String,
      required: true,
      unique: true,
    },
    ten_pttt: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      default: '',
    },
    updatedBy: {
      type: String,
      default: '',
    },
  },
  { timestamps: true, collection: 'pttt' }
);

phuongThucThanhToanSchema.index(
    { ma_pttt: "text", ten_pttt: "text" },
    { default_language: "none" }
  );
phuongThucThanhToanSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhuongThucThanhToan', phuongThucThanhToanSchema);
