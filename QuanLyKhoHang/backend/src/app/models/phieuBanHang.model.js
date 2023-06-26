const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const {
  generateUniqueValueUtil,
  getQuyByMonth,
  generateTimeByDate,
} = require('../../utils/myUtil');
const vatTuModel = require('./vatTu.model');
const tonKhoController = require('../controllers/tonkho.controller');
const createHttpError = require('http-errors');
const soKhoModel = require('./soKho.model');
const moment = require('moment');
const soQuyModel = require('./soQuy.model');
const phieuThuModel = require('./phieuThu.model');

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
      default: 'pbh',
    },
    ten_loai_ct: {
      type: String,
      default: 'Phiếu bán hàng',
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
      default: 'khachle',
    },
    ma_kenh: {
      type: String,
      default: 'Khách lẻ',
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
    tien_hang: {
      // tổng tiền hàng trong detail
      type: Number,
      default: 0,
    },
    ty_le_ck_hd: {
      type: Number,
      default: 0,
    },
    tien_ck_hd: {
      // tien_hang * ty_le_ck_hd / 100
      type: Number,
      default: 0,
    },
    tien_ck_sp: {
      // tổng tiền chiêt khấu trong detail
      type: Number,
      default: 0,
    },
    tong_tien_ck: {
      // tổng tiền chiết khẩu + tiền chiết khấu hóa đơn
      type: Number,
      default: 0,
    },
    VAT: {
      type: Number,
      default: 0,
    },
    thanh_tien: {
      // tien_hang - tong_tien_ck
      type: Number,
      default: 0,
    },
    t_thanh_tien: {
      // thanh_tien + thue + tien_van_chuyen
      type: Number,
      default: 0,
    },
    chi_phi: {
      // tổng số lượng detail * giá vốn
      type: Number,
      default: 0,
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
    nam: {
      type: Number,
      default: 0,
    },
    thang: {
      type: Number,
      default: 0,
    },
    ngay: {
      type: Number,
      default: 0,
    },
    quy: {
      type: Number,
      default: 0,
    },
    gio: {
      type: Number,
      default: 0,
    },
    phut: {
      type: Number,
      default: 0,
    },
    giay: {
      type: Number,
      default: 0,
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
            default: 0,
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
    let pbh = this;
    let tienChietKhauTrenTungSanPham = 0;
    if (pbh.tien_ck_hd) {
      const numberDetail = pbh.details.reduce((acc, item) => {
        return acc + item.sl_xuat;
      }, 0);
      tienChietKhauTrenTungSanPham = pbh.tien_ck_hd / numberDetail;
    }
    for (let i = 0; i < pbh.details.length; i++) {
      const detail = pbh.details[i];
      if (detail.ma_lo) {
        const tonKho = await tonKhoController.getInventoryByConsigmentHelper({
          ma_vt: detail.ma_vt,
          ma_lo: detail.ma_lo,
        });
        if (tonKho.ton_kho < detail.sl_xuat) {
          error = createHttpError(
            400,
            `Hàng hóa '${detail.ten_vt}' chỉ tồn ${tonKho.ton_kho} ở lô '${detail.ten_lo}'`
          );
          break;
        }
      } else {
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
      const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
      if (!vatTu) {
        error = createHttpError(
          400,
          `Mã hàng hóa '${detail.ma_vt}' không tồn tại`
        );
        break;
      } else {
        detail.ma_dvt = vatTu.ma_dvt;
        detail.ten_dvt = vatTu.ten_dvt;
        detail.ma_nvt = vatTu.ma_nvt;
        detail.ten_nvt = vatTu.ten_nvt;
        detail.gia_von = vatTu.gia_von;
        detail.tien_ck_phan_bo = tienChietKhauTrenTungSanPham * detail.sl_xuat;
        detail.tong_tien_ck = detail.tien_ck + detail.tien_ck_phan_bo;
        detail.thanh_tien = detail.tien_hang - detail.tong_tien_ck;
        detail.chi_phi = detail.gia_von * detail.sl_xuat;
      }
    }
    if (error) {
      return next(error);
    } else {
      if (!pbh.ma_phieu) {
        const maPhieu = await generateUniqueValueUtil({
          maDm: 'PBH',
          model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
          compareKey: 'ma_phieu',
        });
        pbh.ma_phieu = maPhieu;
      }
      const maChungTu = await generateUniqueValueUtil({
        maDm: 'PBH',
        model: mongoose.model('PhieuBanHang', phieuBanHangSchema),
        compareKey: 'ma_ct',
      });
      pbh.ma_ct = maChungTu;

      // tinh tien hang
      const tienHang = pbh.details.reduce((acc, item) => {
        return acc + item.don_gia * item.sl_xuat;
      }, 0);
      pbh.tien_hang = tienHang;
      // tinh tien ck san pham
      const tienCkSp = pbh.details.reduce((acc, item) => {
        return acc + item.tien_ck;
      }, 0);
      pbh.tien_ck_sp = tienCkSp;
      // tinh tong tien ck
      const tongCk = pbh.tien_ck_hd + pbh.tien_ck_sp;
      pbh.tong_tien_ck = tongCk;
      // tinh thanh tien
      const thanhTien = pbh.tien_hang - pbh.tong_tien_ck;
      pbh.thanh_tien = thanhTien;
      // tinh tien VAT
      const tienVAT = (pbh.tien_hang * pbh.VAT) / 100;
      // tinh tong thanh tien
      const tongThanhTien = pbh.thanh_tien + tienVAT + pbh.tien_van_chuyen;
      pbh.t_thanh_tien = tongThanhTien;
      // tinh chi phi
      const chiPhi = pbh.details.reduce((acc, item) => {
        return acc + item.sl_xuat * item.gia_von;
      }, 0);
      pbh.chi_phi = chiPhi;
      const { nam, quy, thang, ngay, gio, phut, giay } = generateTimeByDate(
        pbh.ngay_ct
      );
      pbh.nam = nam;
      pbh.quy = quy;
      pbh.thang = thang;
      pbh.ngay = ngay;
      pbh.gio = gio;
      pbh.phut = phut;
      pbh.giay = giay;
      next();
    }
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.post('save', async function () {
  const pbh = this;
  if (pbh.ma_trang_thai === 2) {
    const ngay = pbh.ngay_ct.getDate();
    const thang = pbh.ngay_ct.getMonth() + 1;
    const nam = pbh.ngay_ct.getFullYear();
    const quy = getQuyByMonth(thang);
    const gio = pbh.ngay_ct.getHours();
    const phut = pbh.ngay_ct.getMinutes();
    const giay = pbh.ngay_ct.getSeconds();

    // luu vao phieu thu
    await phieuThuModel.create({
      ma_loai: 'LPT0001',
      ten_loai: 'Thu tiền khách hàng',
      ngay_ct: pbh.ngay_ct,
      ngay_lap_phieu: pbh.ngay_ct,
      gia_tri: pbh.t_thanh_tien,
      ma_pttt: pbh.ma_pttt,
      ten_pttt: pbh.ten_pttt,
      ma_kho: pbh.ma_kho,
      ten_kho: pbh.ten_kho,
      dien_giai: 'Phiếu tạo tự động khi thanh toán hóa đơn bán hàng',
    });

    // luu vao so kho
    pbh.details.forEach(async (detail) => {
      const giaTriBan = detail.sl_xuat * detail.thanh_tien;
      await soKhoModel.create({
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
        ma_lo: detail.ma_lo,
        ten_lo: detail.ten_lo,
        ma_vt: detail.ma_vt,
        ten_vt: detail.ten_vt,
        sl_xuat: detail.sl_xuat,
        so_luong: -detail.sl_xuat,
        ma_kh: pbh.ma_kh,
        gia_tri_ban: giaTriBan,
        chi_phi: detail.chi_phi,
      });
    });
  }
});
phieuBanHangSchema.pre('updateOne', async function (next) {
  try {
    let error;
    let pbh = this.getUpdate();
    console.log({ pbh });
    const filter = this.getFilter();
    const oldPbh = await this.model.findOne(filter);
    if (oldPbh.ma_trang_thai === 2) {
      return next(
        createHttpError(400, 'Không thể chỉnh sửa phiếu bán hàng đã thanh toán')
      );
    }
    let tienChietKhauTrenTungSanPham = 0;
    if (pbh.tien_ck_hd) {
      const numberDetail = pbh.details.reduce((acc, item) => {
        return acc + item.sl_xuat;
      }, 0);
      tienChietKhauTrenTungSanPham = pbh.tien_ck_hd / numberDetail;
    }
    for (let i = 0; i < pbh.details.length; i++) {
      const detail = pbh.details[i];
      if (detail.ma_lo) {
        const tonKho = await tonKhoController.getInventoryByConsigmentHelper({
          ma_vt: detail.ma_vt,
          ma_lo: detail.ma_lo,
        });
        if (tonKho.ton_kho < detail.sl_xuat) {
          error = createHttpError(
            400,
            `Hàng hóa '${detail.ten_vt}' chỉ tồn ${tonKho.ton_kho} ở lô '${detail.ten_lo}'`
          );
          break;
        }
      } else {
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
      const vatTu = await vatTuModel.findOne({ ma_vt: detail.ma_vt });
      if (!vatTu) {
        error = createHttpError(
          400,
          `Mã hàng hóa '${detail.ma_vt}' không tồn tại`
        );
        break;
      } else {
        detail.ma_dvt = vatTu.ma_dvt;
        detail.ten_dvt = vatTu.ten_dvt;
        detail.ma_nvt = vatTu.ma_nvt;
        detail.ten_nvt = vatTu.ten_nvt;
        detail.gia_von = vatTu.gia_von;
        detail.tien_ck_phan_bo = tienChietKhauTrenTungSanPham * detail.sl_xuat;
        detail.tong_tien_ck = detail.tien_ck + detail.tien_ck_phan_bo;
        detail.thanh_tien = detail.tien_hang - detail.tong_tien_ck;
        detail.chi_phi = detail.gia_von * detail.sl_xuat;
      }
    }
    if (error) {
      return next(error);
    } else {
      // tinh tien hang
      const tienHang = pbh.details.reduce((acc, item) => {
        return acc + item.don_gia * item.sl_xuat;
      }, 0);
      pbh.tien_hang = tienHang;
      // tinh tien ck san pham
      const tienCkSp = pbh.details.reduce((acc, item) => {
        return acc + item.tien_ck;
      }, 0);
      pbh.tien_ck_sp = tienCkSp;
      // tinh tong tien ck
      const tongCk = pbh.tien_ck_hd + pbh.tien_ck_sp;
      pbh.tong_tien_ck = tongCk;
      // tinh thanh tien
      const thanhTien = pbh.tien_hang - pbh.tong_tien_ck;
      pbh.thanh_tien = thanhTien;
      // tinh tien VAT
      const tienVAT = (pbh.tien_hang * pbh.VAT) / 100;
      // tinh tong thanh tien
      const tongThanhTien = pbh.thanh_tien + tienVAT + pbh.tien_van_chuyen;
      pbh.t_thanh_tien = tongThanhTien;
      // tinh chi phi
      const chiPhi = pbh.details.reduce((acc, item) => {
        return acc + item.sl_xuat * item.gia_von;
      }, 0);
      pbh.chi_phi = chiPhi;
      const { nam, quy, thang, ngay, gio, phut, giay } = generateTimeByDate(
        new Date(pbh.ngay_ct)
      );
      pbh.nam = nam;
      pbh.quy = quy;
      pbh.thang = thang;
      pbh.ngay = ngay;
      pbh.gio = gio;
      pbh.phut = phut;
      pbh.giay = giay;
      next();
    }
  } catch (error) {
    next(error);
  }
});
phieuBanHangSchema.post('updateOne', async function () {
  let pbh = this.getUpdate().$set;
  if (pbh.ma_trang_thai === 2) {
    const ngay = pbh.ngay_ct.getDate();
    const thang = pbh.ngay_ct.getMonth() + 1;
    const nam = pbh.ngay_ct.getFullYear();
    const quy = getQuyByMonth(thang);
    const gio = pbh.ngay_ct.getHours();
    const phut = pbh.ngay_ct.getMinutes();
    const giay = pbh.ngay_ct.getSeconds();

    // luu vao phieu thu
    // luu vao phieu thu
    await phieuThuModel.create({
      ma_loai: 'LPT0001',
      ten_loai: 'Thu tiền khách hàng',
      ngay_ct: pbh.ngay_ct,
      ngay_lap_phieu: pbh.ngay_ct,
      gia_tri: pbh.t_thanh_tien,
      ma_pttt: pbh.ma_pttt,
      ten_pttt: pbh.ten_pttt,
      ma_kho: pbh.ma_kho,
      ten_kho: pbh.ten_kho,
      dien_giai: 'Phiếu tạo tự động khi thanh toán hóa đơn bán hàng',
    });

    // luu vao so kho
    pbh.details.forEach(async (detail) => {
      const giaTriBan = detail.sl_xuat * detail.thanh_tien;
      await soKhoModel.create({
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
        ma_lo: detail.ma_lo,
        ten_lo: detail.ten_lo,
        ma_vt: detail.ma_vt,
        ten_vt: detail.ten_vt,
        sl_xuat: detail.sl_xuat,
        so_luong: -detail.sl_xuat,
        ma_kh: pbh.ma_kh,
        gia_tri_ban: giaTriBan,
        chi_phi: detail.chi_phi,
      });
    });
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
