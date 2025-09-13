const jwt = require("jsonwebtoken");

const JWT_USER_PASSWORD = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedInformation = jwt.verify(token, JWT_USER_PASSWORD);

  if (decodedInformation) {
    req.userId = decodedInformation.id;
    next();
  } else {
    res.status(403).json({
      msg: "invalid credentials",
    });
  }
}

module.exports = {
  userMiddleware,
  JWT_USER_PASSWORD,
};
