const khoModel = require('../app/models/kho.model');

const generateKho = async () => {
  // Tạo dữ liệu mẫu
  const ma_kho = 'khomacdinh'
  const sampleData = {
    ma_kho,
    ten_kho: 'Kho mặc định',
  };
  const kho = await khoModel.findOne({ ma_kho });
  if (!kho) {
    await khoModel.create(sampleData);
  }
};
module.exports = generateKho;
