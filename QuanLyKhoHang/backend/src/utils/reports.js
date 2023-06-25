const phieuBanHangModel = require("../app/models/phieuBanHang.model");

const reports = {
  doanhthu: {
    model: phieuBanHangModel,
    concernGroup: {
      doanh_thu: { $sum: '$t_thanh_tien' },
      doanh_thu_thuan: { $sum: '$thanh_tien' },
    },
    chaningObjs: [
      {
        $project: {
          _id: 0,
        },
      },
    ],
  },
  loinhuan: {
    model: phieuBanHangModel,
    concernGroup: {
      tong_thanh_tien: { $sum: '$thanh_tien' },
      tong_chi_phi: { $sum: '$chi_phi' },
    },
    chaningObjs: [
      {
        $project: {
          _id: 0,
          ngay: 1,
          thang: 1,
          nam: 1,
          tong_thanh_tien: 1,
          tong_chi_phi: 1,
          loi_nhuan: { $subtract: ['$tong_thanh_tien', '$tong_chi_phi'] },
        },
      },
    ],
  },
};
module.exports = reports;
