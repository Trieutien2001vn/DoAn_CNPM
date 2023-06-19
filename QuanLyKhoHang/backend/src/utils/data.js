const {
  validateCreateStore,
  validateCreateProduct,
  validateCreateNhomVatTu,
  validateCreateDonViTinh,
  validateCreateLo,
  validateCreateNhaCungCap,
  validateCreatePhieuNhapKho,
  validateCreatePhieuXuatKho,
  validateCreatePhieuKiemKho,
  validateCreatePhieuDieuChuyen,
  validateCreatePhieuXuatHuy,
  validateCreateLoaiPhieuThu,
  validateCreateLoaiPhieuChi,
  validateCreateKenhBan,
  validateCreatePTTT,
  validateCreateKH,
  validateCreatePBH,
} = require('./validate');
const khoModel = require('../app/models/kho.model');
const vatTuModel = require('../app/models/vatTu.model');
const nhomVatTuModel = require('../app/models/nhomVatTu.model');
const donViTinhModel = require('../app/models/donViTinh.model');
const loModel = require('../app/models/lo.model');
const nhaCungCapModel = require('../app/models/nhaCungCap.model');
const phieuNhapKhoModel = require('../app/models/phieuNhapKho.model');
const phieuXuatKhoModel = require('../app/models/phieuXuatKho.model');
const phieuKiemKhoModel = require('../app/models/phieuKiemKho.model');
const phieuDieuChuyenModel = require('../app/models/phieuDieuChuyen.model');
const phieuXuatHuyModel = require('../app/models/phieuXuatHuy.model');
const loaiPhieuThuModel = require('../app/models/loaiPhieuThu.model');
const loaiPhieuChiModel = require('../app/models/loaiPhieuChi.model');
const kenhBanModel = require('../app/models/kenhBan.model');
const phuongThucThanhToanModel = require('../app/models/phuongThucThanhToan.model');
const khachHangModel = require('../app/models/khachHang.model');
const phieuBanHangModel = require('../app/models/phieuBanHang.model');

const dsDanhMuc = [
  {
    maDanhMuc: 'dmkho',
    uniqueField: 'ma_kho',
    model: khoModel,
    validate: validateCreateStore,
    fields: ['ma_kho', 'ten_kho', 'dia_chi', 'email', 'dien_thoai'],
  },
  {
    maDanhMuc: 'dmvt',
    uniqueField: 'ma_vt',
    model: vatTuModel,
    validate: validateCreateProduct,
    fields: [
      'ma_vt',
      'ten_vt',
      'barcode',
      'ten_tat',
      'ma_nvt',
      'ten_nvt',
      'ma_dvt',
      'ten_dvt',
      'xuat_xu',
      'gia_von',
      'gia_ban_le',
      'mo_ta',
      'theo_doi_lo',
      'ma_vt_cung_loai',
      'ten_dvt_quy_doi',
      'so_luong_quy_doi',
      'gia_ban_quy_doi',
    ],
  },
  {
    maDanhMuc: 'dmnvt',
    uniqueField: 'ma_nvt',
    model: nhomVatTuModel,
    validate: validateCreateNhomVatTu,
    fields: ['ma_nvt', 'ten_nvt'],
  },
  {
    maDanhMuc: 'dmdvt',
    uniqueField: 'ma_dvt',
    model: donViTinhModel,
    validate: validateCreateDonViTinh,
    fields: ['ma_dvt', 'ten_dvt'],
  },
  {
    maDanhMuc: 'dmlo',
    uniqueField: 'ma_lo',
    model: loModel,
    validate: validateCreateLo,
    fields: [
      'ma_lo',
      'ten_lo',
      'ngay_san_xuat',
      'han_su_dung',
      'ma_vt',
      'ten_vt',
    ],
  },
  {
    maDanhMuc: 'dmncc',
    uniqueField: 'ma_ncc',
    model: nhaCungCapModel,
    validate: validateCreateNhaCungCap,
    fields: [
      'ma_ncc',
      'ten_ncc',
      'dia_chi',
      'dien_thoai',
      'email',
      'fax',
      'thong_tin_them',
    ],
  },
  {
    maDanhMuc: 'dmpnk',
    uniqueField: 'ma_phieu',
    model: phieuNhapKhoModel,
    validate: validateCreatePhieuNhapKho,
    fields: [
      'ma_phieu',
      'ma_kho',
      'ten_kho',
      'ngay_lap_phieu',
      'ngay_nhap_hang',
      'ma_ncc',
      'ten_ncc',
      'mo_ta',
      'details',
    ],
  },
  {
    maDanhMuc: 'dmpxk',
    uniqueField: 'ma_phieu',
    model: phieuXuatKhoModel,
    validate: validateCreatePhieuXuatKho,
    fields: [
      'ma_phieu',
      'ma_kho',
      'ten_kho',
      'ngay_lap_phieu',
      'ngay_nhap_hang',
      'ma_ncc',
      'ten_ncc',
      'mo_ta',
      'details',
    ],
  },
  {
    maDanhMuc: 'dmpkk',
    uniqueField: 'ma_phieu',
    model: phieuKiemKhoModel,
    validate: validateCreatePhieuKiemKho,
    fields: [
      'ma_phieu',
      'ma_kho',
      'ten_kho',
      'ma_vt',
      'ten_vt',
      'ton_kho_so_sach',
      'ton_kho_thuc_te',
      'can_bang_kho',
    ],
  },
  {
    maDanhMuc: 'dmpxdc',
    uniqueField: 'ma_phieu',
    model: phieuDieuChuyenModel,
    validate: validateCreatePhieuDieuChuyen,
    fields: ['ma_phieu', 'ma_kho', 'ten_kho', 'ma_vt', 'ten_vt'],
  },
  {
    maDanhMuc: 'dmpxh',
    uniqueField: 'ma_phieu',
    model: phieuXuatHuyModel,
    validate: validateCreatePhieuXuatHuy,
    fields: ['ma_phieu', 'ma_kho', 'ten_kho', 'ma_vt', 'ten_vt'],
  },
  {
    maDanhMuc: 'dmlpt',
    uniqueField: 'ma_loai',
    model: loaiPhieuThuModel,
    validate: validateCreateLoaiPhieuThu,
    fields: ['ma_loai', 'ten_loai'],
  },
  {
    maDanhMuc: 'dmlpc',
    uniqueField: 'ma_loai',
    model: loaiPhieuChiModel,
    validate: validateCreateLoaiPhieuChi,
    fields: ['ma_loai', 'ten_loai'],
  },
  {
    maDanhMuc: 'dmkb',
    uniqueField: 'ma_kenh',
    model: kenhBanModel,
    validate: validateCreateKenhBan,
    fields: ['ma_kenh', 'ten_kenh'],
  },
  {
    maDanhMuc: 'dmpttt',
    uniqueField: 'ma_pttt',
    model: phuongThucThanhToanModel,
    validate: validateCreatePTTT,
    fields: ['ma_pttt', 'ten_pttt'],
  },
  {
    maDanhMuc: 'dmkh',
    uniqueField: 'sdt',
    model: khachHangModel,
    validate: validateCreateKH,
    fields: ['ma_kh', 'ten_kh'],
  },
  {
    maDanhMuc: 'dmpbh',
    uniqueField: 'ma_phieu',
    model: phieuBanHangModel,
    validate: validateCreatePBH,
    fields: ['ma_phieu', 'ma_ct', 'ma_loai_ct', 'ten_loai_ct'],
  },
];
module.exports = { dsDanhMuc };