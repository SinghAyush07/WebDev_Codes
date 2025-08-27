// admin route

const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", function (req, res) {});

adminRouter.post("/signin", function (req, res) {});

adminRouter.use(adminMiddleware);

// create a course
adminRouter.post("/course", function (req, res) {});

// update a course
adminRouter.put("/course", function (req, res) {});

// see all the course
adminRouter.get("/course/all", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
