const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");

courseRouter.post("/course", function (req, res) {});

courseRouter.put("/course", function (req, res) {});

courseRouter.get("/preview", function (req, res) {});

module.exports = {
  courseRouter: courseRouter,
};
