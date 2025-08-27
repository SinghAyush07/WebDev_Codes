const jwt = require("jsonwebtoken");

const JWT_SECRET = "ayushlovekiara";

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const userId = jwt.verify(token, JWT_SECRET);

  if (userId) {
    req.userId = userId;
    next();
  } else {
    res.status(403).json({
      msg: "invalid credentials...",
    });
  }
}

module.exports = {
  userMiddleware,
};
