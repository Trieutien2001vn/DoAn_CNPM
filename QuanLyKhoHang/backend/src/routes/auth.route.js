const router = require("express").Router();
const authController = require("../app/controllers/auth.controller");

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     description: Sign up an account
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email of user
 *         required: true
 *         type: string
 *       - name: fullname
 *         description: Fullname of user
 *         required: true
 *         type: string
 *       - name: password
 *         description: Password of user
 *         required: true
 *         type: string
 *       - name: role
 *         description: Role of user
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Sign up
 *         schema:
 *           type: object
 */
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/refresh", authController.refreshToken);

module.exports = router;
