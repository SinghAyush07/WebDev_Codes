// Course Router: will handle any request that comes to the /courses endpoint; this the job of the courses router

// function createCourseRoute(app) {
//   app.post("/course/purchase", function (req, res) {});

//   app.get("/course/preview", function (req, res) {});
// }

// module.exports = {
//   createCourseRoute: createCourseRoute,
// };

const express = require("express");
const courseRouter = express.Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    msg: "hellowww",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    msg: "hellowww",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
