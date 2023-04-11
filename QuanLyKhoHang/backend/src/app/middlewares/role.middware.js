const createError = require("http-errors");

const roleMiddleWare = {
  checkAdmin(req, res, next) {
    const { role } = req.user;
    if (role !== 1) {
      return next(createError(403, "You are not admin"));
    }
    next();
  },
  checkAdminOrManager(req, res, next) {
    try {
      const { role } = req.user;
      if (!(role === 1 || role === 2)) {
        return next(createError(403, "You are not permission"));
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};
module.exports = roleMiddleWare;
