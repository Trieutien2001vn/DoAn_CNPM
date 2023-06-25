const router = require("express").Router();
const soQuyController = require("../app/controllers/soquy.controller");
const authMiddleware = require("../app/middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware.verifyToken,
  soQuyController.getTotalInventoryHelper
);

module.exports = router;
