const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

const propertySchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const incomeSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const debtSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const transactionRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  transactionType: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

const conditionReportSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const adviceReportSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    required: true,
  },
  preference: {
    type: String,
    trim: true,
    required: false,
  },
  goals: {
    type: [goalSchema],
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  properties: {
    type: [propertySchema],
    required: false,
  },
  incomes: {
    type: [incomeSchema],
    required: false,
  },
  debts: {
    type: [debtSchema],
    required: false,
  },
  accountbook: {
    type: [transactionRecordSchema],
    required: false,
  },
  conditionReports: {
    type: [conditionReportSchema],
    required: false,
  },
  adviceReports: {
    type: [adviceReportSchema],
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
