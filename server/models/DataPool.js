const mongoose = require("mongoose");

const dataPoolSchema = new mongoose.Schema({
  condtionReports: {
    type: [conditionReportSchem],
    required: false,
  },
  adviceReports: {
    type: [adviceReportSchema],
    required: false,
  },
});

const conditionReportSchem = mongoose.Schema({
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

const adviceReportSchema = mongoose.Schema({
  adviceType: {
    type: String,
    trim: true,
    required: true,
  },
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

const DataPool = mongoose.model("DataPool", dataPoolSchema);

module.exports = DataPool;
