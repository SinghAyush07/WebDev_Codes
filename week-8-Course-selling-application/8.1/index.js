const express = require("express");
const mongoose = require("mongoose");
// const { createUserRoute } = require("./routes/user");
// const { createCourseRoute } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

// connecting to the mongodb

// createUserRoute(app);
// createCourseRoute(app);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", courseRouter);

async function main() {
  await mongoose.connect(/* mongodb url*/);
  app.listen(3000, () => {
    console.log(`listening on port ${3000}....`);
  });
}

main().catch((err) => {
  console.log(err);
});
