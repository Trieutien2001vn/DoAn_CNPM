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
const PBHModel = require('../models/phieuBanHang.model');
const createHttpError = require('http-errors');

const reportController = {
  // Báo cáo bán hàng
  //  - Báo cáo doanh thu
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
};

module.exports = reportController;
