const router = require('express').Router();
const authMiddleWare = require('../app/middlewares/auth.middleware');
const roleMiddleWare = require('../app/middlewares/role.middware');
const reportController = require('../app/controllers/baocao.controller');

// Báo cáo bán hàng
// Báo cáo doanh thu
router.post(
  '/doanhthutheothoigian',
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdminOrManager,
  reportController.getRevenueByTime
);

module.exports = router;
