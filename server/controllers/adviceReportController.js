const {
  generateAdviceReport,
} = require("../services/AIAgentServices/AdviceReportService");
const {
  storeAdviceReport,
  getAdviceReports,
} = require("../services/userServices/adviceReportService");

/**
 * Controller to store an advice report
 * @param {Object} req - The request object containing userId in the params and report data in the body
 * @param {Object} res - The response object used to return the status
 */
const storeAdviceReportController = async (req, res) => {
  const { userId } = req.params;
  const { adviceType, content, date } = req.body;

  try {
    await storeAdviceReport(userId, { adviceType, content, date });
    res.status(200).json({ message: "Advice report stored successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateAdviceReportController = async (req, res) => {
  const { userId } = req.params;
  try {
    const report = await generateAdviceReport(userId);
    console.log(report);
    await storeAdviceReport(userId, report);
    res.status(200).json({ message: "Advice report stored successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to get a user's advice reports
 * @param {Object} req - The request object containing userId in the params
 * @param {Object} res - The response object used to return the user's advice reports
 */
const getAdviceReportsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await getAdviceReports(userId);
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Controller to get all advice reports from DataPool
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to return the advice reports from DataPool
 */
const getAdviceReportsFromDataPoolController = async (req, res) => {
  try {
    const reports = await getAdviceReportsFromDataPool();
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  storeAdviceReportController,
  getAdviceReportsController,
  getAdviceReportsFromDataPoolController,
  generateAdviceReportController,
};
