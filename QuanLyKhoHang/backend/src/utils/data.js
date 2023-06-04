const {
  validateCreateStore,
  validateCreateProduct,
  validateCreateNhomVatTu,
  validateCreateDonViTinh,
  validateCreateLo,
  validateCreateNhaCungCap,
  validateCreatePhieuNhapKho,
  validateCreateChungTu,
  validateCreatePhieuXuatKho,
  validateCreatePhieuKiemKho,
  validateCreatePhieuDieuChuyen,
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
const chungTuModel = require('../app/models/chungTu.model');

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
    maDanhMuc: 'dmct',
    uniqueField: 'ma_ct',
    model: chungTuModel,
    validate: validateCreateChungTu,
    fields: ['ma_ct', 'ten_ct', 'dien_giai'],
  },
];
module.exports = { dsDanhMuc };
