// using mongoose for database of our server
const mongoose = require("mongoose");
// const mongoose, { Schema } = require("mongoose");

// mongoose library exports a class called Schema
const Schema = mongoose.Schema;

// Importing ObjectId from mongoose library
const ObjectId = mongoose.ObjectId;

// Defining the User Schema

// Schema : Finally Data kaisa dikhega in the database
// Encrypting the password using bcrypt library
// also adding a layer of salt to it
const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

// Defining the Todo Schema

const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

// collection that you want to put data into
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

// Exporting the UserModel and TodoModel
module.exports = {
  UserModel: UserModel,
  TodoModel: TodoModel,
};
