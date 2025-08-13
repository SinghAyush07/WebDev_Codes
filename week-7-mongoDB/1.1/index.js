const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(/* mongoDB url*/);
}

const app = express();
app.use(express.json());

// Now writing the end points of the application

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // why should we use await ??
  try {
    await UserModel.create({
      email: email,
      password: password,
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
    email: email,
    password: password,
  });
  console.log(user);
  if (user) {
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
