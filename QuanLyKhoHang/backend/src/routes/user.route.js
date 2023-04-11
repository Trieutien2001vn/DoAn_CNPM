const router = require("express").Router();
const authMiddleWare = require("../app/middlewares/auth.middleware");
const roleMiddleWare = require("../app/middlewares/role.middware");
const userController = require("../app/controllers/user.controller");

router.put("/", authMiddleWare.verifyToken, userController.updateUser);
router.delete(
  "/:id",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  userController.deleteById
);
router.get(
  "/verify-email",
  authMiddleWare.verifyToken,
  userController.verifyEmail
);
router.get("/staff", authMiddleWare.verifyToken, userController.getAllUser);

module.exports = router;
