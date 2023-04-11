const joi = require("joi");

// auth
const validateUserSignup = (user) => {
  const userSchema = joi.object({
    fullname: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().required().email(),
  });
  return userSchema.validate(user);
};
const validateUserSignIn = (user) => {
  const userSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return userSchema.validate(user);
};


// store
const validateCreateStore = (store) => {
  const storeSchema = joi.object({
    code: joi.string().required(),
    name: joi.string().required(),
  });
  return storeSchema.validate(store);
};

module.exports = {
  validateUserSignup,
  validateUserSignIn,
  validateCreateStore,
};
