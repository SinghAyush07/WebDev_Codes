const { Router } = require("express");
const userRouter = Router();
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middleware/userMiddleware");
const { JWT_USER_PASSWORD } = require("../config");

const UserSignupZ = z.object({
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

userRouter.post("/signup", async function (req, res) {
  try {
    const userValid = UserSignupZ.safeParse(req.body);

    const { email, firstName, lastName, password } = userValid.data;
    const saltRound = 5;
    const encryptedPassword = await bcrypt.hash(password, saltRound);
    await UserModel.create({
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

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const User = await UserModel.findOne({
      email: email,
    });

    if (User) {
      const checkValidation = bcrypt.compare(password, User.password);
      if (checkValidation) {
        const token = jwt.sign(
          {
            id: User._id.toString(),
          },
          JWT_USER_PASSWORD
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

userRouter.use(userMiddleware);

userRouter.post("/purchase", async function (req, res) {
  const { userId, courseId } = req.body;
  try {
    await PurchaseModel.create({
      courseId: courseId,
      userId: userId,
    });
    res.json({
      msg: "purchase sucessful",
    });
  } catch (err) {
    res.status(403).json({
      msg: "error while purchasing",
    });
  }
});

userRouter.get("/purchases", async function (req, res) {
  const userId = req.userId;
  const purchases = await PurchaseModel.find({
    userId,
  });
  const courseData = await CourseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
