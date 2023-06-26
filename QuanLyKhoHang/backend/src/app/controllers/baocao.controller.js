/*
  * Báo cáo bán hàng
  - Báo cáo doanh thu
  + Theo thời gian
  + Theo nguồn bán hàng (update)
  + Sản phẩm bán chạy
  + Doanh thu theo sản phẩm
  + Doanh thu theo đơn hàng
  + Doanh thu theo khách hàng
  + Doanh thu theo nhân viên
  + Doanh thu theo chi nhánh
  + Báo cáo trả hàng theo sản phẩm
  + Báo cáo trả hàng theo đơn hàng
  + Báo cáo bán hàng chi tiết

  - Báo cáo lợi nhuận
  + Lợi nhuận theo thời gian
  + Lợi nhuận theo đơn hàng
  + Lợi nhuận theo khách hàng (update)
  + Lợi nhuận theo nhóm khách hàng (update)
  + Lợi nhuận theo chi nhánh
  + Lợi nhuận theo sản phẩm
  + Lợi nhuận theo nhân viên (update)
  + Lợi nhuận theo nguồn bán hàng (update)
  + Báo cáo bán hàng tổng hợp

  * Báo cáo kho
  - Báo cáo tồn kho
  - Sổ kho
  - Báo cáo dưới định mức tồn
  - Xuất, nhập tồn
  - Báo cáo vượt đinh mức
  - Báo cáo kiểm hàng
  - Báo cáo gợi ý nhập hàng

  * Báo cáo tài chính
  - Báo cái lãi lỗ
  - Sổ quỹ
  - Báo cáo công nợ phải thu
  - Báo cáo công nợ phải trả
*/
const moment = require('moment');
const { getMonthsByPeriod, getDatesInMonth } = require('../../utils/myUtil');
const createHttpError = require('http-errors');
const soKhoModel = require('../models/soKho.model');

const reportController = {
  // Báo cáo bán hàng
  //  - Báo cáo doanh thu

  // handler functions
  async getXNTHangHoa({ startDate, endDate, skip, limit, condition }) {
    const result = [];

    const matchObj = {
      $match: { ngay_ct: { $gte: startDate, $lte: endDate }, ...condition },
    };

    let nhapXuatKhos = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          nhap_kho: { $sum: '$sl_nhap' },
          xuat_kho: { $sum: '$sl_xuat' },
        },
      },
      { $project: { _id: 0 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    let count = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          nhap_kho: { $sum: '$sl_nhap' },
          xuat_kho: { $sum: '$sl_xuat' },
        },
      },
    ]);
    const matchObjDauKy = {
      $match: { ngay_ct: { $lt: startDate }, ...condition },
    };
    const tonDauKys = await soKhoModel.aggregate([
      matchObjDauKy,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ton_dau_ky: { $sum: '$so_luong' },
        },
      },
      { $project: { _id: 0 } },
    ]);
    const matchObjCuoiKy = {
      $match: { ngay_ct: { $lte: endDate }, ...condition },
    };
    const tonCuoiKys = await soKhoModel.aggregate([
      matchObjCuoiKy,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ton_cuoi_ky: { $sum: '$so_luong' },
        },
      },
      { $project: { _id: 0 } },
    ]);
    for (let i = 0; i < nhapXuatKhos.length; i++) {
      const maVt = nhapXuatKhos[i].ma_vt;
      const tonDauKy = tonDauKys.find((item) => item.ma_vt === maVt);
      const tonCuoiKy = tonCuoiKys.find((item) => item.ma_vt === maVt);
      result.push({
        ...nhapXuatKhos[i],
        ton_dau_ky: tonDauKy?.ton_dau_ky || 0,
        ton_cuoi_ky: tonCuoiKy?.ton_cuoi_ky || 0,
      });
    }
    return { data: result, count: count.length };
  },
  async getBanHangHangHoa({ startDate, endDate, skip, limit, condition }) {
    const matchObj = {
      $match: {
        ngay_ct: { $gte: startDate, $lte: endDate },
        ma_loai_ct: 'pbh',
        ...condition,
      },
    };
    const result = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          t_sl_ban: { $sum: '$sl_xuat' },
          doanh_thu_thuan: { $sum: '$gia_tri_ban' },
        },
      },
      { $skip: skip },
      { $limit: limit },
      { $project: { _id: 0 } },
    ]);
    const count = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
        },
      },
    ]);
    return { data: result, count: count.length };
  },
  async getLoiNhuanHangHoa({ startDate, endDate, skip, limit, condition }) {
    const matchObj = {
      $match: {
        ngay_ct: { $gte: startDate, $lte: endDate },
        ma_loai_ct: 'pbh',
        ...condition,
      },
    };
    const result = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          t_sl_ban: { $sum: '$sl_xuat' },
          doanh_thu_thuan: { $sum: '$gia_tri_ban' },
          t_gia_von: { $sum: '$chi_phi' },
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          ma_vt: 1,
          ten_vt: 1,
          t_sl_ban: 1,
          doanh_thu_thuan: 1,
          t_gia_von: 1,
          loi_nhuan: { $subtract: ['$doanh_thu_thuan', '$t_gia_von'] },
        },
      },
    ]);
    const count = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
        },
      },
    ]);
    return { data: result, count: count.length };
  },
  async getKhachHangHangHoa({ startDate, endDate, skip, limit, condition }) {
    const matchObj = {
      $match: {
        ngay_ct: { $gte: startDate, $lte: endDate },
        ma_loai_ct: 'pbh',
        ...condition,
      },
    };
    const result = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          sl_mua: { $sum: '$sl_xuat' },
          gia_tri: { $sum: '$gia_tri_ban' },
          customers: { $addToSet: '$ma_kh' },
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          ma_vt: 1,
          ten_vt: 1,
          sl_mua: 1,
          gia_tri: 1,
          sl_khach: { $size: '$customers' },
        },
      },
    ]);
    const count = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
        },
      },
    ]);
    return { data: result, count: count.length };
  },
  async getNCCHangHoa({ startDate, endDate, skip, limit, condition }) {
    const matchObj = {
      $match: {
        ngay_ct: { $gte: startDate, $lte: endDate },
        ma_loai_ct: 'pnk',
        ...condition,
      },
    };
    const result = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
          ma_vt: { $first: '$ma_vt' },
          ten_vt: { $first: '$ten_vt' },
          sl_nhap: { $sum: '$sl_nhap' },
          gia_tri: { $sum: '$gia_tri_nhap' },
          suppliers: { $addToSet: '$ma_ncc' },
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          ma_vt: 1,
          ten_vt: 1,
          sl_nhap: 1,
          gia_tri: 1,
          sl_ncc: { $size: '$suppliers' },
        },
      },
    ]);
    const count = await soKhoModel.aggregate([
      matchObj,
      {
        $group: {
          _id: '$ma_vt',
        },
      },
    ]);
    return { data: result, count: count.length };
  },

  // api function
  async getReport(req, res, next) {
    try {
      /*
        thang = 1
        ngay = 2
      */
      let { tu_ngay, den_ngay, ...condition } = req.body;

      if (!tu_ngay) {
        return next(createHttpError(404, 'Báo cáo cần biết ngày bắt đầu'));
      }
      if (!den_ngay) {
        den_ngay = moment();
      }

      let dates = [];
      let type = 1;
      let data = [];
      // lấy ra các tháng trong khoảng thời gian
      dates = getMonthsByPeriod({ tu_ngay, den_ngay });
      // nếu chỉ có 1 tháng thì lấy ra các ngày trong tháng đó
      const monthLength = dates.length;
      if (monthLength === 1) {
        type = 2;
        dates = getDatesInMonth({ tu_ngay, den_ngay });
      }

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const dateObj = moment(date);
        const ngay = dateObj.date();
        const thang = dateObj.month() + 1;
        const nam = dateObj.year();
        const matchObj = {
          $match: { nam, thang, ma_trang_thai: 2, ...condition },
        };
        if (type === 1) {
          if (i === 0) {
            const startDate = moment(tu_ngay);
            matchObj.$match.ngay = { $gte: startDate.date() };
          } else if (i === dates.length - 1) {
            const endDate = moment(den_ngay);
            matchObj.$match.ngay = { $lte: endDate.date() };
          }
        } else if (type === 2) {
          matchObj.$match.ngay = ngay;
        }
        const groupObj = {
          $group: {
            _id: null,
            nam: { $first: '$nam' },
            thang: { $first: '$thang' },
            ngay: { $first: type === 1 ? '' : '$ngay' },
            ...req.report.concernGroup,
          },
        };
        const result = await req.report.model.aggregate([
          matchObj,
          groupObj,
          ...req.report.chaningObjs,
        ]);
        if (result.length === 1) {
          data.push(result[0]);
        }
      }
      return res.status(200).json({ type, data });
    } catch (error) {
      next(error);
    }
  },
  async reportHangHoa(req, res, next) {
    try {
      let { tu_ngay, den_ngay, page, limit, type, ...condition } = req.body;
      let startDate;
      let endDate;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 20;
      }
      if (!type) {
        type = 1;
      }
      const skip = (page - 1) * limit;
      startDate = tu_ngay ? new Date(tu_ngay) : new Date();
      endDate = den_ngay ? new Date(den_ngay) : new Date();

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      let result = {};

      switch (type) {
        case '2':
          result = await reportController.getLoiNhuanHangHoa({
            startDate,
            endDate,
            skip,
            limit,
            condition,
          });
          break;
        case '3':
          result = await reportController.getXNTHangHoa({
            startDate,
            endDate,
            skip,
            limit,
            condition,
          });
          break;
        case '4':
          result = await reportController.getKhachHangHangHoa({
            startDate,
            endDate,
            skip,
            limit,
            condition,
          });
          break;
        case '5':
          result = await reportController.getNCCHangHoa({
            startDate,
            endDate,
            skip,
            limit,
            condition,
          });
          break;
        default:
          result = await reportController.getBanHangHangHoa({
            startDate,
            endDate,
            skip,
            limit,
            condition,
          });
          break;
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reportController;
