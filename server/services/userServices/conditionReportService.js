// services/conditionReportService.js
const User = require("../../models/User");
const DataPool = require("../../models/DataPool"); // 假设DataPool是一个模型，用于存储所有用户的condition reports

/**
 * 存储用户的 condition report
 * @param {String} userId - 用户的唯一 ID
 * @param {Object} reportData - 包括 content 和 date 的 condition report 数据
 * @throws {Error} - 如果用户不存在或其他错误
 */
const storeConditionReport = async (userId, reportData) => {
    // 查找用户
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // 创建新的 condition report 对象
    const newReport = {
        content: reportData.content,
        date: reportData.date,
    };

    // 将 report 存储到用户的 conditionReports 数组中
    user.conditionReports.push(newReport);

    // 同时存储到 DataPool 的 conditionReports 数组中
    const dataPool = await DataPool.findOne(); // 假设只有一个全局的数据池
    if (dataPool) {
        dataPool.conditionReports.push(newReport);
        await dataPool.save();
    }

    // 保存用户信息
    await user.save();
};

/**
 * 获取用户的所有 condition reports
 * @param {String} userId - 用户的唯一 ID
 * @returns {Array} - 用户的 condition reports 列表
 * @throws {Error} - 如果用户不存在或其他错误
 */
const getConditionReports = async (userId) => {
    const user = await User.findById(userId).select("conditionReports");

    if (!user) {
        throw new Error("User not found");
    }

    return user.conditionReports.map((report) => ({
        content: report.content,
        date: report.date,
    }));
};

module.exports = { storeConditionReport, getConditionReports };
