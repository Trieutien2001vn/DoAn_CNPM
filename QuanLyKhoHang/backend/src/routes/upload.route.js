const router = require("express").Router();
const { upload } = require("../utils/myUtil");
const uploadController = require("../app/controllers/upload.controller");
const authMiddleWare = require("../app/middlewares/auth.middleware");

router.post(
  "/user/avatar",
  authMiddleWare.verifyToken,
  upload.single("avatar"),
  uploadController.uploadAvatarUser
);

module.exports = router;
