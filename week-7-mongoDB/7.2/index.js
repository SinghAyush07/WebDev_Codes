const bcrypt = require("bcrypt");
const express = require("express");
const z = require("zod");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

// connecting to the mongodb Server
async function main() {
  await mongoose.connect();
}

const app = express();
app.use(express.json());

// Now writing the end points of the application
// Note : at the top of the routes there should be validation check of the data send by the user
app.post("/signup", async function (req, res) {
  // req.body
  //{
  //    email: String,
  //    password: String,
  //    username: String,
  //}

  const requireBody = z.strictObject({
    email: z.email(),
    password: z // custom logic using refine to check special char in pwd
      .string()
      .min(5)
      .uppercase()
      .lowercase()
      .refine(
        (data) => {
          const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          return specialChar.test(data);
        },
        {
          message: "password must contain atleast one Special char",
        }
      ),
    username: z.string().max(60),
  });
  // const parsedData = requireBody.parse(req.body);
  const parseDataWithSucess = requireBody.safeParse(req.body);

  if (!parseDataWithSucess.success) {
    res.json({
      msg: "Incorrect Format",
      error: parseDataWithSucess.error.issues,
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // input validation
  // if (typeof email != "string" || !email.includes("@")) {
  //   res.json({
  //     msg: "email is incorrect",
  //   });
  // }                                                              // UglyWay to do

  // before storing password encrypt it
  const hashedPassword = await bcrypt.hash(password, 5); // promisified approach

  // why should we use await ??
  try {
    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    res.json({
      msg: "you are signed up",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "invalid credentials",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email, // no need to compare password here
  }); // the findOne will return the whole entry with the give email match

  // first check even if the email exits or not before hiting the password match
  if (!user) {
    res.status(403).json({
      msg: "User not found",
    });
  }
  const PasswordMatch = await bcrypt.compare(password, user.password);
  if (PasswordMatch) {
    const token = jwt.sign(
      // encoding user._id
      {
        id: user._id.toString(), // user._id is of type object
        // we need to convert it into a string
      },
      JWT_SECRET
    );
    res.json(
      {
        msg: token,
      },
      JWT_SECRET
    );
  } else {
    res.status(403).json({
      msg: "invalid credentials",
    });
  }
});

app.use(auth);

app.post("/todo", async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  try {
    await TodoModel.create({
      title: title,
      done: done,
      userId: userId,
    });
    res.json({
      msg: "todo added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "error encounter",
    });
  }
});

// get all the todos
app.get("/todos", async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.findOne({
    userId: userId,
  });

  console.log(todos);
  res.json({
    title: todos.title,
    done: todos.done,
    userId: todos.userId,
  });
});

app.listen(3000, () => {
  console.log("we are live....");
});
