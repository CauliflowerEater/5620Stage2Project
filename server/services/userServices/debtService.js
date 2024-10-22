// services/debtService.js
const User = require("../../models/User");

/**
 * 添加债务到用户的债务列表
 * @param {String} userId - 用户的唯一 ID
 * @param {Object} debtData - 债务数据，包括 title 和 amount
 * @returns {Object} - 更新后的用户信息或错误信息
 * @throws {Error} - 如果用户不存在或其他错误
 */
const setDebt = async (userId, debtData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // 将新的债务添加到用户的 debts 数组中
    user.debts.push({
        description: debtData.title,
        amount: debtData.amount,
    });

    // 保存用户信息
    await user.save();

    return user;
};

/**
 * 获取用户的所有债务
 * @param {String} userId - 用户的唯一 ID
 * @returns {Array} - 用户的债务列表
 * @throws {Error} - 如果用户不存在或其他错误
 */
const getDebts = async (userId) => {
    const user = await User.findById(userId).select("debts");

    if (!user) {
        throw new Error("User not found");
    }

    // 格式化返回的债务数据
    return user.debts.map((debt) => ({
        title: debt.description,
        amount: debt.amount,
    }));
};

module.exports = { setDebt, getDebts };
