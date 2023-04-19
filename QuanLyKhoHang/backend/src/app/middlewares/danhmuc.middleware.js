const createError = require("http-errors");
const khoModel = require("../models/kho.model");
const vatTuModel = require("../models/vatTu.model");
const {
  validateCreateStore,
  validateCreateProduct,
  validateCreateNhomVatTu,
  validateCreateDonViTinh,
  validateCreateLo,
  validateCreateNhaCungCap,
  validateCreatePhieuNhapKho,
} = require("../../utils/validate");
const roleMiddleWare = require("./role.middware");
const nhomVatTuModel = require("../models/nhomVatTu.model");
const donViTinhModel = require("../models/donViTinh.model");
const loModel = require("../models/lo.model");
const nhaCungCapModel = require("../models/nhaCungCap.model");
const phieuNhapKhoModel = require("../models/phieuNhapKho.model");

const dsDanhMuc = [
  {
    maDanhMuc: "dmkho",
    uniqueField: "ma_kho",
    model: khoModel,
    validate: validateCreateStore,
    fields: ["ma_kho", "ten_kho", "dia_chi", "email", "dien_thoai"],
  },
  {
    maDanhMuc: "dmvt",
    uniqueField: "ma_vt",
    model: vatTuModel,
    validate: validateCreateProduct,
    fields: [
      "ma_vt",
      "ten_vt",
      "barcode",
      "ma_nvt",
      "ten_nvt",
      "ma_dvt",
      "ten_dvt",
      "ma_ncc",
      "ten_ncc",
      "gia_ban_le",
      "xuat_xu",
      "mo_ta",
    ],
  },
  {
    maDanhMuc: "dmnvt",
    uniqueField: "ma_nvt",
    model: nhomVatTuModel,
    validate: validateCreateNhomVatTu,
    fields: ["ma_nvt", "ten_nvt"],
  },
  {
    maDanhMuc: "dmdvt",
    uniqueField: "ma_dvt",
    model: donViTinhModel,
    validate: validateCreateDonViTinh,
    fields: ["ma_dvt", "ten_dvt"],
  },
  {
    maDanhMuc: "dmlo",
    uniqueField: "ma_lo",
    model: loModel,
    validate: validateCreateLo,
    fields: [
      "ma_lo",
      "ten_lo",
      "ngay_san_xuat",
      "han_su_dung",
      "ma_vt",
      "ten_vt",
    ],
  },
  {
    maDanhMuc: "dmncc",
    uniqueField: "ma_ncc",
    model: nhaCungCapModel,
    validate: validateCreateNhaCungCap,
    fields: [
      "ma_ncc",
      "ten_ncc",
      "dia_chi",
      "dien_thoai",
      "email",
      "fax",
      "thong_tin_them",
    ],
  },
  {
    maDanhMuc: "dmpnk",
    uniqueField: "ma_phieu",
    model: phieuNhapKhoModel,
    validate: validateCreatePhieuNhapKho,
    fields: [
      "ma_phieu",
      "ma_kho",
      "ten_kho",
      "ngay_lap_phieu",
      "ngay_nhap_hang",
      "ma_ncc",
      "ten_ncc",
      "mo_ta",
      "details",
    ],
  },
];

const danhMucMiddleWare = {
  // assign danh muc
  assignDanhMuc(req, res, next) {
    try {
      const { ma_danh_muc } = req.params;
      if (!ma_danh_muc) {
        return next(createError(400, "Không xác định được danh mục"));
      }
      const danhMuc = dsDanhMuc.find((dm) => dm.maDanhMuc === ma_danh_muc);
      if (!danhMuc) {
        return next(
          createError(404, `Danh mục '${ma_danh_muc}' không tồn tại`)
        );
      }
      req.danhMuc = danhMuc;
      next();
    } catch (error) {
      next(error);
    }
  },
  // specify Role On Danh Muc
  specifyRoleOnDanhMuc(req, res, next) {
    try {
      const danhMuc = req.danhMuc;
      if (!danhMuc) {
        return next(createError(400, "Không xác định được danh mục"));
      }
      switch (danhMuc.maDanhMuc) {
        case "dmkho":
          return roleMiddleWare.checkAdmin(req, res, next);
        default:
          return roleMiddleWare.exceptNhanVienBanHang(req, res, next);
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = danhMucMiddleWare;
