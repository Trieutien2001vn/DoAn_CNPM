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

const reportController = {
  // Báo cáo bán hàng
  //  - Báo cáo doanh thu
  async reportByDate(req, res, next) {
    try {
      const { date } = req.body;
      if (!date) {
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reportController;
