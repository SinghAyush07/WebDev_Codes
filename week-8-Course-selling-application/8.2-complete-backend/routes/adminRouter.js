const { Router } = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db");
const { adminMiddleware } = require("../middleware/adminMiddleware");
const { JWT_ADMIN_PASSWORD } = require("../config");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminSignupZ = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 character long")
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val), {
      message: "Password must contain at least one special character",
    }),
});
adminRouter.post("/signup", async function (req, res) {
  try {
    const adminValid = AdminSignupZ.safeParse(req.body);
    const { email, firstName, lastName, password } = adminValid.data;

    const saltRound = 5;
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    await AdminModel.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: encryptedPassword,
    });
    res.json({
      msg: "you are signed up",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const Admin = await AdminModel.findOne({
      email: email,
    });

    if (Admin) {
      const checkValidation = bcrypt.compare(password, Admin.password);
      if (checkValidation) {
        const token = jwt.sign(
          {
            id: Admin._id.toString(),
          },
          JWT_ADMIN_PASSWORD
        );

        // cookie logic or session logic
        res.json({
          token: token,
        });
      } else {
        res.status(403).json({
          msg: "invalid credentials",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      msg: err,
    });
  }
});

adminRouter.use(adminMiddleware);

adminRouter.post("/course", function (req, res) {});

adminRouter.put("/course", function (req, res) {});

adminRouter.get("/course/bulk", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
