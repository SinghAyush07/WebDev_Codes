const jwt = require("jsonwebtoken");

const JWT_SECRET = "ayushlovekiara";

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const userId = jwt.verify(token, JWT_SECRET);

  if (adminId) {
    req.adminId = adminId;
    next();
  } else {
    res.status(403).json({
      msg: "invalid credentials...",
    });
  }
}

module.exports = {
  adminMiddleware,
};
