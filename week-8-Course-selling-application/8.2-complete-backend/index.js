require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const { userRouter } = require("./routes/userRouter");
const { adminRouter } = require("./routes/adminRouter");
const { courseRouter } = require("./routes/courseRouter");

const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log(`listening on port ${3000}.....`);
  });
}

main().catch((err) => {
  console.log(err);
});
