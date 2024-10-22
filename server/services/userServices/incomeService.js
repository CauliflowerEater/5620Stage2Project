// services/incomeService.js
const User = require("../../models/User");

/**
 * 添加收入到用户的收入列表
 * @param {String} userId - 用户的唯一 ID
 * @param {Object} incomeData - 收入数据，包括 title 和 amount
 * @returns {Object} - 更新后的用户信息或错误信息
 * @throws {Error} - 如果用户不存在或其他错误
 */
const setIncome = async (userId, incomeData) => {
    // 查找用户
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // 将新的收入添加到用户的 incomes 数组中
    user.incomes.push({
        description: incomeData.title,
        amount: incomeData.amount,
    });

    // 保存用户信息
    await user.save();

    return user;
};

/**
 * 获取用户的所有收入
 * @param {String} userId - 用户的唯一 ID
 * @returns {Array} - 用户的收入列表
 * @throws {Error} - 如果用户不存在或其他错误
 */
const getIncomes = async (userId) => {
    // 查找用户，并只选择 incomes 字段
    const user = await User.findById(userId).select("incomes");

    if (!user) {
        throw new Error("User not found");
    }

    // 格式化返回的收入数据
    return user.incomes.map((income) => ({
        title: income.description,
        amount: income.amount,
    }));
};
module.exports = { setIncome , getIncomes};
