const generateTrangThai = require('./trangthai.seed');
const generateChungTu = require('./chungtu.seed');
const generateLoaiPhieuThu = require('./loaiphieuthu.seed');
const generateNguoiDung = require('./nguoidung.seed');
const generatePhanQuyen = require('./phanquyen.seed');
const generateKho = require('./kho.seed');
const generateLoaiPhieuChi = require('./loaiphieuchi.seed');
const generatePTTT = require('./pttt.seed');
const generateKenhBan = require('./kenhban.seed');

const generateSeed = async () => {
  await generateTrangThai();
  await generateChungTu();
  await generateLoaiPhieuThu();
  await generateLoaiPhieuChi();
  await generatePhanQuyen();
  await generateNguoiDung();
  await generateKho();
  await generatePTTT();
  await generateKenhBan();
  console.log('Khởi tạo dữ liệu thành công');
};
module.exports = generateSeed;
