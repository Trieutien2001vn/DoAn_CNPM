const router = require("express").Router();
const authMiddleWare = require("../app/middlewares/auth.middleware");
const roleMiddleWare = require("../app/middlewares/role.middware");
const storeController = require("../app/controllers/store.controller");

router.post(
  "/",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  storeController.create
);
router.put(
  "/",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  storeController.update
);
router.delete(
  "/:code",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  storeController.delete
);
router.delete(
  "/:code/destroy",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  storeController.destroy
);
router.post(
  "/restore",
  authMiddleWare.verifyToken,
  roleMiddleWare.checkAdmin,
  storeController.restore
);
router.post("/search", authMiddleWare.verifyToken, storeController.search);
router.post(
  "/search/deleted",
  authMiddleWare.verifyToken,
  storeController.searchDeleted
);

module.exports = router;
