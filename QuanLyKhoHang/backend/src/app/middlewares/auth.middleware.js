const jwt = require("jsonwebtoken");

const authMiddleWare = {
  verifyToken(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      return res.status(404).json({ message: "You are not access token" });
    }
    const accessToken = tokenHeader.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({ message: "You are not authenticated" });
        }
        req.user = decoded;
        next();
      }
    );
  },
};
module.exports = authMiddleWare;
