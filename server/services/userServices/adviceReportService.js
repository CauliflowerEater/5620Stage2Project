const User = require("../../models/User");
const DataPool = require("../../models/DataPool");

/**
 * Save user's Advice report
 * @param {String} userId - unique User ID
 * @param {Object} reportData - Include adviceType, content and date in Advice report
 * @throws {Error} - If user not found
 */
const storeAdviceReport = async (userId, reportData) => {
  // Find the specific user
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Create new advice report object
  const newReport = {
    content: reportData.content,
    date: reportData.date,
  };

  // Save the report to user's DataPool
  user.adviceReports.push(newReport);

  // Find or create(if not exist) DataPool and save it into adviceReports
  let dataPool = await DataPool.findOne();
  if (!dataPool) {
    dataPool = new DataPool();
  }
  dataPool.adviceReports.push(newReport);

  // Save user and their DataPool
  await user.save();
  await dataPool.save();
};

/**
 * Get all advice reports about aspecific user
 * @param {String} userId - unique User ID
 * @returns {Array} - List of advice reports
 * @throws {Error} - If user not found
 */
const getAdviceReports = async (userId) => {
  const user = await User.findById(userId).select("adviceReports");
  if (!user) {
    throw new Error("User not found");
  }

  return user.adviceReports;
};

/**
 * Get all of advice reports from DataPool
 * @returns {Array} - List of advice reports in the DataPool
 * @throws {Error} - If DataPool not found
 */
const getAdviceReportsFromDataPool = async () => {
  const dataPool = await DataPool.findOne().select("adviceReports");
  if (!dataPool) {
    throw new Error("DataPool not found");
  }

  // Return array of adviceReports in the DataPool, Format [{ content, date }]
  return dataPool.adviceReports.map((report) => ({
    content: report.content,
    date: report.date,
  }));
};

module.exports = {
  storeAdviceReport,
  getAdviceReports,
  getAdviceReportsFromDataPool,
};
