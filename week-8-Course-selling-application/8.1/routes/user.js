// users router : will handle any request that comes to the /users endpoit

// function createUserRoute(app) {
//   app.post("/user/signup", function (req, res) {});

//   app.post("/user/signin", function (req, res) {});

//   app.get("/user/purchase", function (req, res) {});
// }

// module.exports = {
//   createUserRoute: createUserRoute,
// };

// const express = require("express");
// const userRouter = express.Router();
const { Router } = require("express");
const userRouter = Router();
const { userMiddleware } = require("./middleware/user");

userRouter.post("/signup", function (req, res) {
  res.json({
    msg: "hellowww",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    msg: "hellowww",
  });
});

userRouter.use(userMiddleware);

userRouter.get("/purchases", function (req, res) {
  res.json({
    msg: "hellowww",
  });
});

module.exports = {
  userRouter: userRouter,
};
