const { storeAdviceReport, getAdviceReports } = require("../services/userServices/adviceReportService");

/**
 * 存储 advice report 的控制器
 * @param {Object} req - 请求对象，包含 userId 参数和 report 数据
 * @param {Object} res - 响应对象，用于返回存储状态
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

/**
 * 获取用户的 advice reports 控制器
 * @param {Object} req - 请求对象，包含 userId 参数
 * @param {Object} res - 响应对象，用于返回用户的 advice reports
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
 * 获取 DataPool 中的 advice reports 控制器
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象，用于返回 DataPool 中的 advice reports
 */
const getAdviceReportsFromDataPoolController = async (req, res) => {
    try {
      const reports = await getAdviceReportsFromDataPool();
      res.status(200).json(reports);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = { storeAdviceReportController, getAdviceReportsController, getAdviceReportsFromDataPoolController  };
