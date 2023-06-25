const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const soQuySchema = new mongoose.Schema(
  {
    ma_ct: {
      type: String,
      unique:true,
    },
    ngay_ct: {
        type: Date,
        default:null,
      },
      
   ngay_lap_phieu: {
        type: Date,
        default:null,
    },
    ma_loai_ct: {
      type: String,
      default:''
    },
    ten_loai_ct: {
      type: String,
      default:''
    },
    ten_pttt:{
      type:String,
      default:''
    },
    ten_nguoi_nop_nhan:{
      type:String,
      default:''
    },
    gia_tri:{
     type: Number,
     default:0
    },
    tien:{
     type: Number,
     default:0
    },
    dien_giai:{
      type:String,
      default:''
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
  { timestamps: true, collection: 'so_quy' }
);

soQuySchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

module.exports = mongoose.model("SoQuy", soQuySchema);
