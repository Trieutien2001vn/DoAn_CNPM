const trangThaiModel = require('../app/models/trangThai.model');

const generateTrangThai = async () => {
  // Tạo dữ liệu mẫu
  const sampleData = [
    { ma_trang_thai: 1, ten_trang_thai: 'Khởi tạo' },
    { ma_trang_thai: 2, ten_trang_thai: 'Duyệt' },
    { ma_trang_thai: 3, ten_trang_thai: 'Hoàn thành' },
  ];
  const operations = sampleData.map((doc) => ({
    updateOne: {
      filter: { ma_trang_thai: doc.ma_trang_thai },
      update: doc,
      upsert: true,
      new: true,
    },
  }));
  await trangThaiModel.bulkWrite(operations);
};
module.exports = generateTrangThai;
