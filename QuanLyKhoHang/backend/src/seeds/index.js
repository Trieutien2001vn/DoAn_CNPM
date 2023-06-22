const generateTrangThai = require('./trangthai.seed');
const generateChungTu = require('./chungtu.seed');
const generateLoaiPhieuThu = require('./loaiphieuthu.seed');
const generateNguoiDung = require('./nguoidung.seed');
const generatePhanQuyen = require('./phanquyen.seed');
const generateKho = require('./kho.seed');
const generateNhomNguoiNop = require('./nhomnguoinop.seed');

const generateSeed = async () => {
  await generateTrangThai();
  await generateChungTu();
  await generateLoaiPhieuThu();
  await generatePhanQuyen();
  await generateNguoiDung();
  await generateKho();
  await generateNhomNguoiNop();
  console.log('Khởi tạo dữ liệu thành công');
};
module.exports = generateSeed;
