// defining schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Defining User Schema
const UserSchema = new Schema({
  userId: ObjectId,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

// Defining Couse Creater (admin) Schema
const AdminSchema = new Schema({
  adminId: ObjectId,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
});

// Course Schema
const CourseSchema = new Schema({
  courseId: ObjectId,
  title: String,
  description: String,
  price: Number,
  imgURL: String,
  adminId: ObjectId,
});

// Purchased course schema

const PurchasesSchema = new Schema({
  purchaseId: ObjectId,
  courseId: ObjectId,
  userId: ObjectId,
});

// Collection that you want to put in
const UserModel = mongoose.model("User", UserSchema);
const AdminModel = mongoose.model("Admin", AdminSchema);
const CourseModel = mongoose.model("Course", CourseSchema);
const PurchasesModel = mongoose.model("Purchased", PurchasesSchema);

module.exports = {
  UserModel: UserModel,
  AdminModel: AdminModel,
  CourseModel: CourseModel,
  PurchasesModel: PurchasesModel,
};
