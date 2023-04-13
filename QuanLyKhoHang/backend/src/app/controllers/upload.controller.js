const userModel = require("../models/user.model");
const createError = require("http-errors");
const fs = require("fs");

const uploadController = {
  async uploadAvatarUser(req, res, next) {
    try {
      const file = req.file;
      const { _id } = req.user;
      const user = await userModel.findById(_id);
      if (!user) {
        return next(createError(404, "User not found"));
      }
      if (user.avatarUrl) {
        const filePath = `src/public${user.avatarUrl}`;
        fs.access(filePath, (error) => {
          if (!error) {
            fs.unlink(filePath, (error) => {
              if (error) {
                return next(error);
              }
            });
          }
        });
      }
      user.avatarUrl = `/uploads/user/${file.filename}`;
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = uploadController;
