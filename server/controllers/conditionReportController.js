// controllers/conditionReportController.js
const { storeConditionReport,getConditionReports } = require("../services/userServices/conditionReportService");

/**
 * 存储 condition report 的方法（无返回值）
 */
const storeConditionReportController = async (req, res) => {
    const { userId } = req.params;
    const { content, date } = req.body;

    try {
        await storeConditionReport(userId, { content, date });
        res.status(200).json({ message: "Condition report stored successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 获取用户所有 condition reports 的控制器
 * @param {Object} req - 请求对象，包含 userId 参数
 * @param {Object} res - 响应对象，用于返回数据
 */
const getConditionReportsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const reports = await getConditionReports(userId);
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 获取 DataPool 中的 condition reports 控制器
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象，用于返回 DataPool 中的 condition reports
 */
const getConditionReportsFromDataPoolController = async (req, res) => {
    try {
        const reports = await getConditionReportsFromDataPool();
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { storeConditionReportController, getConditionReportsController, getConditionReportsFromDataPoolController };