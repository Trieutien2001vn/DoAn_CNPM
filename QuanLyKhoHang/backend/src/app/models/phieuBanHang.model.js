const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const {
  generateUniqueValueUtil,
  getQuyByMonth,
} = require('../../utils/myUtil');
const chungTuModel = require('./chungTu.model');
const vatTuModel = require('./vatTu.model');
const trangThaiPBHModel = require('./trangThaiPhieuBanHang.model');
const tonKhoController = require('../controllers/tonkho.controller');
const createHttpError = require('http-errors');
const soCaiModel = require('./soCai.model');

const phieuBanHangSchema = new mongoose.Schema(
  {
    ma_phieu: {
      type: String,
      unique: true,
    },
    ma_ct: {
      type: String,
      default: '',
    },
    ma_loai_ct: {
      type: String,
      default: 'pbh'
    },
    ten_loai_ct: {
      type: String,
      default: 'Phiếu bán hàng'
    },
    ma_kho: {
      type: String,
      required: true,
    },
    ten_kho: {
      type: String,
      required: true,
    },
    ngay_ct: {
      type: Date,
      default: null,
    },
    ngay_lap_phieu: {
      type: Date,
      default: null,
    },
    ma_nv: {
      type: String,
      default: '',
    },
    ten_nv: {
      type: String,
      default: '',
    },
    ma_kh: {
      type: String,
      default: '',
    },
    ten_kh: {
      type: String,
      default: '',
    },
    ma_kenh: {
      type: String,
      default: '',
    },
    ten_kenh: {
      type: String,
      default: '',
    },
    ma_pttt: {
      type: String,
      default: '',
    },
    ten_pttt: {
      type: String,
      default: '',
    },
    tien_hang: { // tổng tiền hàng trong detail 
      type: Number,
      default: 0,
    },
    ty_le_ck_hd: {
      type: Number,
      default: 0,
    },
    tien_ck_hd: { // tien_hang * ty_le_ck_hd / 100
      type: Number,
      default: 0,
    },
    tien_ck_sp: { // tổng tiền chiêt khấu trong detail
      type: Number,
      default: 0,
    },
    tong_tien_ck: { // tổng tiền chiết khẩu + tiền chiết khấu hóa đơn
      type: Number,
      default: 0,
    },
    VAT: {
      type: Number,
      default: 0
    },
    thanh_tien: {  // tien_hang - tong_tien_ck
      type: Number,
      default: 0,
    },
    t_thanh_tien: { // thanh_tien + thue + tien_van_chuyen
      type: Number,
      default: 0
    },
    chi_phi: { // tổng số lượng detail * giá vốn
      type: Number,
      default: 0
    },
    tien_thu: {
      type: Number,
      default: 0,
    },
    tien_thoi: {
      type: Number,
      default: 0,
    },
    tien_van_chuyen: {
      type: Number,
      default: 0,
    },
    ghi_chu: {
      type: String,
      default: '',
    },
    ma_trang_thai: {
      type: Number,
      default: 1,
    },
    ten_trang_thai: {
      type: String,
      default: '',
    },
    details: {
      type: [
        {
          ma_vt: {
            type: String,
            required: true,
          },
          ten_vt: {
            type: String,
            required: true,
          },
          ma_dvt: {
            type: String,
            default: '',
          },
          ten_dvt: {
            type: String,
            default: '',
          },
          ma_nvt: {
            type: String,
            default: '',
          },
          ten_nvt: {
            type: String,
            default: '',
          },
          ma_lo: {
            type: String,
            default: '',
          },
          ten_lo: {
            type: String,
            default: '',
          },
          gia_von: {
            type: Number,
            default: 0,
          },
          don_gia: {
            type: Number,
            default: 0,
          },
          sl_xuat: {
            type: Number,
            default: 0,
          },
          tien_hang: {
            type: Number,
            default: 0,
          },
          ty_le_ck: {
            type: Number,
            default: 0,
          },
          tien_ck: {
            type: Number,
            default: 0,
          },
          tien_ck_phan_bo: {
            type: Number,
            default: 0,
          },
          tong_tien_ck: {
            type: Number,
            default: 0,
          },
          thanh_tien: {
            type: Number,
            default: 0,
          },
          chi_phi: {
            type: Number,
            default: 0
          },
          ghi_chu: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
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
  { timestamps: true, collection: 'phieu_ban_hang' }
);

phieuBanHangSchema.pre('save', async function (next) {
  try {
    let error;
    const pbh = this;
    for (let i = 0; i < pbh.details.length; i++) {
      const detail = pbh.details[i];
      const tonKho = await tonKhoController.getInventoryOnStoreHelper({
        ma_vt: detail.ma_vt,
        ma_kho: pbh.ma_kho,
      });
      if (tonKho.ton_kho < detail.sl_xuat) {
        error = createHttpError(
          400,
          `Hàng hóa '${detail.ten_vt}' chỉ tồn ${tonKho.ton_kho} tại kho '${pbh.ten_kho}'`
        );
        break;
      }
    }
    if (error) {
      return next(error);
    } else {
      if (!pbh.ma_phieu) {
        const maPhieu = await generateUniqueValueUtil({
          maDm: 'pbh',
          model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
          compareKey: 'ma_phieu',
        });
        pbh.ma_phieu = maPhieu;
      }
      const maChungTu = await generateUniqueValueUtil({
        maDm: 'pbh',
        model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
        compareKey: 'ma_ct',
      });
      pbh.ma_ct = maChungTu;
      // tinh tien hang
      const tienHang = pbh.details.reduce((acc, item) => {
        return acc + (item.don_gia * item.sl_xuat)
      }, 0)
      pbh.tien_hang = tienHang
      // tinh tien ck san pham
      const tienCkSp = pbh.details.reduce((acc, item) => {
        return acc + item.tien_ck
      }, 0)
      pbh.tien_ck_sp = tienCkSp
      // tinh tong tien ck
      const tongCk = pbh.tien_ck_hd + pbh.tien_ck_sp
      pbh.tong_tien_ck = tongCk
      next();
      // tinh thanh tien
      const thanhTien = pbh.tien_hang - pbh.tong_tien_ck
      pbh.thanh_tien = thanhTien
      // tinh tong thanh tien
      const tongThanhTien = pbh.thanh_tien + pbh.VAT + pbh.tien_van_chuyen
      pbh.t_thanh_tien = tongThanhTien
      // tinh chi phi
      const chiPhi = pbh.details.reduce((acc, item) => {
        return acc + (item.sl_xuat * item.gia_von)
      }, 0)
      pbh.chi_phi = chiPhi
    }
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.post('save', async function () {
  const pbh = this;
  const ngay = pbh.ngay_ct.getDate();
  const thang = pbh.ngay_ct.getMonth() + 1;
  const nam = pbh.ngay_ct.getFullYear();
  const quy = getQuyByMonth(thang);
  const gio = pbh.ngay_ct.getHours();
  const phut = pbh.ngay_ct.getMinutes();
  const giay = pbh.ngay_ct.getSeconds();

  const numberDetail = pbh.details.reduce((acc, item) => {
    return acc + item.sl_xuat;
  }, 0);

  pbh.details.forEach(async (detail) => {
    const thanhTienChietKhau =
      detail.tien_hang - detail.tien_ck - detail.tien_ck_phan_bo;
    const thue = pbh.thue / numberDetail;
    const tienVanChuyen = pbh.tien_van_chuyen / numberDetail;
    const thanhTien = thanhTienChietKhau + thue + tienVanChuyen;
    const chiPhi = detail.sl_xuat * detail.gia_von;
    await soCaiModel.create({
      ma_ct: pbh.ma_ct,
      ma_loai_ct: pbh.ma_loai_ct,
      ten_loai_ct: pbh.ten_loai_ct,
      ma_kho: pbh.ma_kho,
      ten_kho: pbh.ten_kho,
      ngay_ct: pbh.ngay_ct,
      nam,
      quy,
      thang,
      ngay,
      gio,
      phut,
      giay,
      ma_vt: detail.ma_vt,
      ten_vt: detail.ten_vt,
      ma_dvt: detail.ma_dvt,
      ten_dvt: detail.ten_dvt,
      ma_nvt: detail.ma_nvt,
      ten_nvt: detail.ten_nvt,
      ma_lo: detail.ma_lo,
      ten_lo: detail.ten_lo,
      ma_pttt: pbh.ma_pttt,
      ten_pttt: pbh.ten_pttt,
      so_luong: -detail.sl_xuat,
      gia_von: detail.gia_von,
      tien_hang: detail.tien_hang,
      thanh_tien: thanhTien,
      thanh_tien_thue: thanhTien - thue,
      thue: '',
      // dac thu
      ma_nv: pbh.ma_nv,
      ten_nv: pbh.ten_nv,
      ma_kh: pbh.ma_kh,
      ten_kh: pbh.ten_kh,
      ma_kenh: pbh.ma_kenh,
      ten_kenh: pbh.ten_kenh,
      sl_xuat: detail.sl_xuat,
      chi_phi: chiPhi,
      don_gia: detail.gia_ban_le,
      ty_le_ck: detail.ty_le_ck,
      tien_ck: detail.tien_ck,
      tien_ck_phan_bo: detail.tien_ck_phan_bo,
      tien_van_chuyen: tienVanChuyen,
      tien_hang_ck: thanhTienChietKhau,
      loi_nhuan: thanhTienChietKhau - chiPhi,
    });
  });
});
phieuBanHangSchema.pre('updateOne', function (next) {
  try {
    const filter = this.getFilter();
    const pbh = this.model.findOne(filter);
    if (pbh?.ma_trang_thai === 3) {
      return next(
        createHttpError(400, 'Không thể chỉnh sửa, phiếu bán lẻ đã lưu vào sổ')
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.pre('updateMany', function (next) {
  try {
    return next(
      createHttpError(400, 'Không thể chỉnh xóa, phiếu bán lẻ đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.pre('deleteMany', function (next) {
  try {
    return next(
      createHttpError(400, 'Không thể chỉnh xóa, phiếu bán lẻ đã lưu vào sổ')
    );
  } catch (error) {
    next(error);
  }
});

phieuBanHangSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: 'all',
});

module.exports = mongoose.model('PhieuBanHang', phieuBanHangSchema);
