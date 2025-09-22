const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  userId: ObjectId,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const AdminSchema = new Schema({
  adminId: ObjectId,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

const CourseSchema = new Schema({
  courseId: ObjectId,
  adminId: ObjectId,
  title: String,
  description: String,
  imageURL: String,
  price: Number,
});

const PurchasesSchema = new Schema({
  adminId: ObjectId,
  userId: ObjectId,
});

// create a schema for the course content -> like video1, video2, video3, assignments, etc.,

const UserModel = mongoose.model("user", UserSchema);
const AdminModel = mongoose.model("admin", AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const PurchaseModel = mongoose.model("purchase", PurchasesSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
  ObjectId,
};
