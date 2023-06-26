const soQuyModel = require('../models/soQuy.model');

const soQuyController = {
  async getTotalInventoryHelper(req, res, next) {
    let { tu_ngay, den_ngay } = req.body;
    const startDate = tu_ngay ? new Date(tu_ngay) : new Date();
    const endDate = den_ngay ? new Date(den_ngay) : new Date();

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    /*
      - Tồn đầu kỳ
      - Tồn cuối kỳ
      - Các bản ghi trong kỳ
    */
    //  {
    //   ton_dau_ky: 353343, => từ trước giờ đến < tu_ngay
    //   ton_cuoi_ky: 834343, => từ trước giờ đến <= den_ngay
    //   records: [{}]
    //  }

    let soQuy = {};
    // tinh ton dau ky
    const tonDauKy = await soQuyModel.aggregate([
      { $match: { ngay_ct: { $lt: startDate } } },
      {
        $group: {
          _id: null,
          ton_dau_ky: { $sum: '$tien' },
        },
      },
    ]);
    if (tonDauKy.length === 1) {
      soQuy.ton_dau_ky = tonDauKy[0].ton_dau_ky;
    }

    // tinh ton cuoi ky
    const tonCuoiKy = await soQuyModel.aggregate([
      { $match: { ngay_ct: { $lte: endDate } } },
      {
        $group: {
          _id: null,
          ton_cuoi_ky: { $sum: '$tien' },
        },
      },
    ]);
    if (tonCuoiKy.length === 1) {
      soQuy.ton_cuoi_ky = tonCuoiKy[0].ton_cuoi_ky;
    }
    // lay ra cac record
    const records = await soQuyModel.find({
      ngay_ct: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    soQuy.records = records;
    return res.status(200).json(soQuy);
  },
};
module.exports = soQuyController;
