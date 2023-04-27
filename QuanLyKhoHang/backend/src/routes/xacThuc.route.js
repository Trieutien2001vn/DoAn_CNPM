const router = require("express").Router();
const xacThucController = require("../app/controllers/xacThuc.controller");
const authMiddleWare = require("../app/middlewares/auth.middleware");
const roleMiddleWare = require("../app/middlewares/role.middware");

router.post(
  "/dangKy",
  // authMiddleWare.verifyToken,
  // roleMiddleWare.checkAdmin,
  xacThucController.dangKy
);
router.post("/dangNhap", xacThucController.dangNhap);
router.post("/lamMoi", xacThucController.lamMoi);

module.exports = router;
