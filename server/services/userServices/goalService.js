// services/goalService.js
const User = require("../../models/User");

/**
 * 添加财务目标到用户的目标列表
 * @param {String} userId - 用户的唯一 ID
 * @param {Object} goalData - 目标数据，包括 title、amount 和 date
 * @returns {Object} - 更新后的用户信息或错误信息
 * @throws {Error} - 如果用户不存在或其他错误
 */
const setFinancialGoal = async (userId, goalData) => {
    // 查找用户
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // 将新的目标添加到用户的 goals 数组中
    user.goals.push({
        description: goalData.title,
        amount: goalData.amount,
        date: goalData.date,
    });

    // 保存用户信息
    await user.save();

    return user;
};

/**
 * 获取用户的所有财务目标
 */
const getFinancialGoals = async (userId) => {
    // 查找用户，并只选择 goals 字段
    const user = await User.findById(userId).select("goals");

    if (!user) {
        throw new Error("User not found");
    }

    // 格式化返回的目标数据
    return user.goals.map((goal) => ({
        title: goal.description,
        amount: goal.amount,
        date: goal.date,
    }));
};

module.exports = { setFinancialGoal, getFinancialGoals};
