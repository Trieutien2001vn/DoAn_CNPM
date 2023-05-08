const joi = require("joi");

// phân quyền
const validateCreatePhanQuyen = (phanQuyen) => {
  const phanQuyenSchema = joi.object({
    ma_phan_quyen: joi.number().required(),
    ten_phan_quyen: joi.string().required(),
  });
  return phanQuyenSchema.validate(phanQuyen);
};
// auth
const validateNguoiDungDangKy = (user) => {
  const userSchema = joi.object({
    ma_nguoi_dung: joi.string().required(),
    ten_nguoi_dung: joi.string().required(),
    mat_khau: joi.string().required(),
    email: joi.string().required().email(),
    ma_phan_quyen: joi.number().required(),
  });
  return userSchema.validate(user);
};
const validateNguoiDungDangNhap = (user) => {
  const userSchema = joi.object({
    email: joi.string().required().email(),
    mat_khau: joi.string().required(),
  });
  return userSchema.validate(user);
};

// store
const validateCreateStore = ({ ma_kho, ten_kho }) => {
  const storeSchema = joi.object({
    ma_kho: joi.string().required(),
    ten_kho: joi.string().required(),
  });
  return storeSchema.validate({ ma_kho, ten_kho });
};
// product
const validateCreateProduct = ({ ma_vt, ten_vt }) => {
  const productSchema = joi.object({
    ma_vt: joi.string().required(),
    ten_vt: joi.string().required(),
  });
  return productSchema.validate({ ma_vt, ten_vt });
};
// nhom vat tu
const validateCreateNhomVatTu = ({ ma_nvt, ten_nvt }) => {
  const modelSchema = joi.object({
    ma_nvt: joi.string().required(),
    ten_nvt: joi.string().required(),
  });
  return modelSchema.validate({ ma_nvt, ten_nvt });
};
// file
const validateCreateFile = (file) => {
  const fileSchema = joi.object({
    ma_danh_muc: joi.string().required(),
    path: joi.string().required(),
  });
  return fileSchema.validate(file);
};
// don vi tinh
const validateCreateDonViTinh = ({ ma_dvt, ten_dvt }) => {
  const modelSchema = joi.object({
    ma_dvt: joi.string().required(),
    ten_dvt: joi.string().required(),
  });
  return modelSchema.validate({ ma_dvt, ten_dvt });
};
// lo
const validateCreateLo = ({ ma_lo, ten_lo }) => {
  const modelSchema = joi.object({
    ma_lo: joi.string().required(),
    ten_lo: joi.string().required(),
  });
  return modelSchema.validate({ ma_lo, ten_lo });
};
// nha cung cap
const validateCreateNhaCungCap = ({ ma_ncc, ten_ncc }) => {
  const modelSchema = joi.object({
    ma_ncc: joi.string().required(),
    ten_ncc: joi.string().required(),
  });
  return modelSchema.validate({ ma_ncc, ten_ncc });
};
// phieu nhap kho
const validateCreatePhieuNhapKho = ({ ma_phieu, ma_kho, ten_kho }) => {
  const modelSchema = joi.object({
    ma_phieu: joi.string().required(),
    ma_kho: joi.string().required(),
    ten_kho: joi.string().required(),
  });
  return modelSchema.validate({ ma_phieu, ma_kho, ten_kho });
};
// chung tu
const validateCreateChungTu = ({ ma_ct, ten_ct }) => {
  const modelSchema = joi.object({
    ma_ct: joi.string().required(),
    ten_ct: joi.string().required(),
  });
  return modelSchema.validate({ ma_ct, ten_ct });
};

module.exports = {
  validateCreatePhanQuyen,
  validateNguoiDungDangKy,
  validateNguoiDungDangNhap,
  validateCreateStore,
  validateCreateProduct,
  validateCreateFile,
  validateCreateNhomVatTu,
  validateCreateDonViTinh,
  validateCreateLo,
  validateCreateNhaCungCap,
  validateCreatePhieuNhapKho,
  validateCreateChungTu,
};
