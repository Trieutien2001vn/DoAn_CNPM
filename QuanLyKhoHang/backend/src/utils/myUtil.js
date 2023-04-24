const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const multer = require("multer");
const fs = require("fs");
const { v4 } = require("uuid");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      ma_phan_quyen: user.ma_phan_quyen,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "1d" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      ma_phan_quyen: user.ma_phan_quyen,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "30d" }
  );
};
function generateRandomCode(length = 6, prefix = "") {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${code}`;
}

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) {
      return cb(createError(404, "Không nhận được file"));
    }
    const folederSave = req.query.folder;
    if (!folederSave) {
      const err = createError(400, "Không xác định foler lưu");
      return cb(err);
    }
    fs.access(`src/public/uploads/${folederSave}`, (error) => {
      if (error) {
        return cb(error);
      }
    });
    cb(null, `src/public/uploads/${folederSave}`);
  },
  filename: function (req, file, cb) {
    const nameToSave = v4() + "_" + file.originalname;
    file.nameToSave = nameToSave;
    cb(null, nameToSave);
  },
});

const upload = multer({
  storage: storage,
});

// delete file
const deleteFile = (path) => {
  if (!path) return;
  fs.access(path, (error) => {
    if (!error) {
      fs.unlink(path, (error) => {
        if (error) {
          return next(error);
        }
      });
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateRandomCode,
  upload,
  deleteFile,
};
