const LoaiPhieuThuModel = require('../app/models/loaiPhieuThu.model');

const generateLoaiPhieuThu = async () => {
  // Tạo dữ liệu mẫu
  const sampleData = [
    { ma_loai: 'LPT0001', ten_loai: 'Thu tiền khách hàng' },
    { ma_loai: 'LPT0002', ten_loai: 'Thu tiền nhà cung cấp' },
  ];
  const operations = sampleData.map((doc) => ({
    updateOne: {
      filter: { ma_loai: doc.ma_loai },
      update: doc,
      upsert: true,
      new: true,
    },
  }));
  await LoaiPhieuThuModel.bulkWrite(operations);
};
module.exports = generateLoaiPhieuThu;
