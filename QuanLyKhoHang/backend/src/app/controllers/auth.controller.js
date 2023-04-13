const userModel = require("../models/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/myUtil");
const {
  validateUserSignup,
  validateUserSignIn,
} = require("../../utils/validate");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token.model");

const authController = {
  // sign up
  async signUp(req, res, next) {
    try {
      const { role, ...rest } = req.body;
      const { error } = validateUserSignup(rest);
      if (error) {
        return next(error);
      }
      const userCheck = await userModel.findOne({ email: req.body.email });
      if (userCheck) {
        return next(createError(400, "Email is exist"));
      }
      const userSaved = await userModel.create(req.body);
      const { password, ...user } = userSaved.toObject();
      return res.status(200).json(user);
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  },
  // sign in
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const { error } = validateUserSignIn({ email, password });
      if (error) {
        return next(error);
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return next(createError(404, "Email is not found"));
      }
      const isValidPassword = await user.isValidPassword(password);
      if (!isValidPassword) {
        return next(createError(400, "Password is not match"));
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const tokenSaved = await tokenModel.findOne({ email: email });
      if (tokenSaved) {
        await tokenModel.deleteOne({ email });
      } else {
        await tokenModel.create({ email, value: refreshToken });
      }
      const { password: pw, ...userSend } = user.toObject();
      return res
        .status(200)
        .json({ user: userSend, accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  // refresh token
  async refreshToken(req, res, next) {
    try {
      const { email, refreshToken } = req.body;
      if (!refreshToken) {
        return next(createError(400, "Missing refresh token in body"));
      }
      if (!email) {
        return next(createError(400, "Missing email in body"));
      }
      const tokenExisted = await tokenModel.findOne({
        email,
        value: refreshToken,
      });
      if (!tokenExisted) {
        return next(createError(404, "Refresh token not found"));
      }
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        async function (err, decoded) {
          if (err) {
            return next(createError(400, "Refresh token is invalid"));
          }
          await tokenModel.deleteOne({ email, value: refreshToken });
          const accessToken = generateAccessToken(decoded);
          const newRefreshToken = generateRefreshToken(decoded);
          await tokenModel.create({ email, value: newRefreshToken });
          return res
            .status(200)
            .json({ accessToken, refreshToken: newRefreshToken });
        }
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
