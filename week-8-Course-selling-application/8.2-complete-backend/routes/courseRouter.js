const { Router } = require("express");
const courseRouter = Router();
const { PurchaseModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middleware/userMiddleware");

// no need to authenticate the preview
courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});

  res.json({
    courses: courses,
  });
});

// need auth before purchasing
courseRouter.use(userMiddleware);
// purchase the course
courseRouter.post("/purchase", async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  // check the user have paid the price
  const checkPurcases = await PurchaseModel.findOne({
    userId,
    courseId,
  });
  if (checkPurcases) {
    res.json({
      msg: "user already have the course",
    });
  }
  await PurchaseModel.create({
    userId: userId,
    courseId: courseId,
  });
  res.json({
    msg: "you have successfully bought the course",
  });
});

// all purchases course
courseRouter.get("/purchases", async function (req, res, next) {
  const userId = req.userId;
  const purchases = await PurchaseModel.find({
    userId,
  });
  res.json({
    purchases,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
