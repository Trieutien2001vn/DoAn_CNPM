const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const uploadRoute = require("./upload.route");
const storeRoute = require("./store.route");
const createError = require("http-errors");

const initApiRoute = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/upload", uploadRoute);
  app.use("/api/v1/stores", storeRoute);

  // handle error
  app.use((req, res, next) => {
    const error = createError.NotFound("Route is not exist");
    next(error);
  });
  app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message;
    return res.status(statusCode).json({ status: statusCode, message });
  });
};
module.exports = initApiRoute;
