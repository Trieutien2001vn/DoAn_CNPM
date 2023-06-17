const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const khachHangSchema = new mongoose.Schema(
  {
    ma_kh: {
      type: String,
      required: true,
      unique: true,
    },
    ten_kh: {
      type: String,
      required: true,
      unique: true,
    },
    sdt: {
        type: String,
        required: true,
        unique: true,
      },
    dia_chi:{
        type: String,
        default:'',
    },
    ngay_sinh:{
        type:Date,
        default:null
    },
    email:{
        type:String,
        default:""
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
  { timestamps: true, collection: 'khach_hang' }
);

khachHangSchema.index(
    { ma_kh: "text", ten_kh: "text",sdt:'text',dia_chi:'text',email:'text'},
    { default_language: "none" }
  );
khachHangSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Khách Hàng', khachHangSchema);
