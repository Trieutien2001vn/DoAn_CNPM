const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseDelete = require("mongoose-delete");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 1, // 1: Admin, 2: Thu kho; 3: Nhan vien
    },
    fullname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    emailVerifyAt: {
      type: Date,
      default: "",
    },
    stores: {
      type: [String],
      default: [],
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "users" }
);
// Middleware to hash password before saving to database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
// Method to check if password is correct
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
userSchema.plugin(mongooseDelete, { deletedAt: true, deletedBy: true });

module.exports = mongoose.model("User", userSchema);
