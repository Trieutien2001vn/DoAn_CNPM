const userModel = require("../models/user.model");
const createError = require("http-errors");

const userController = {
  async updateUser(req, res, next) {
    try {
      const userToken = req.user;
      let user = await userModel.findById(userToken._id);
      if (!user) {
        return next(createError(404, "User not found"));
      }
      if (req.user._id !== req.body._id) {
        return next(createError(403, "Your are not permission"));
      }
      await userModel.updateOne({ _id: req.user._id }, req.body);
      user = await userModel.findById(req.user._id);
      const { password: pw, ...userSend } = user.toObject();
      return res.status(200).json(userSend);
    } catch (error) {
      next(error);
    }
  },
  async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        return next(createError(400, "Missing id in param"));
      }
      const userToDelete = await userModel.findById(id);
      if (!userToDelete) {
        return next(404, "User not found");
      }
      await userToDelete.delete(req.user._id);
      return res.status(200).json(userToDelete);
    } catch (error) {
      next(error);
    }
  },
  // verify email
  async verifyEmail(req, res, next) {
    try {
      const {_id, email} = req.user;
      
    } catch (error) {
      next(error)
    }
  },
  async getAllUser() {
    try {
      const users = await userModel.find({});
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = userController;
