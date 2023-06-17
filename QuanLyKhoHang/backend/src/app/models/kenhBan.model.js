const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const kenhBanSchema = new mongoose.Schema(
  {
    ma_kenh: {
      type: String,
      required: true,
      unique: true,
    },
    ten_kenh: {
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
  { timestamps: true, collection: 'kenh_ban' }
);

kenhBanSchema.index(
    { ma_kenh: "text", ten_kenh: "text" },
    { default_language: "none" }
  );
kenhBanSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('KenhBan', kenhBanSchema);
