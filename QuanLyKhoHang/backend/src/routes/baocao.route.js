const router = require('express').Router();
const authMiddleWare = require('../app/middlewares/auth.middleware');
const roleMiddleWare = require('../app/middlewares/role.middware');
const reportController = require('../app/controllers/baocao.controller');

// get link exel danh muc
router.post(
  '/doanhthutheongay',
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdminOrManager,
  reportController.reportByDate
);

module.exports = router;
