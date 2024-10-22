// services/propertyService.js
const User = require("../../models/User");

/**
 * 添加财产到用户的财产列表
 * @param {String} userId - 用户的唯一 ID
 * @param {Object} propertyData - 财产数据，包括 title 和 amount
 * @returns {Object} - 更新后的用户信息或错误信息
 * @throws {Error} - 如果用户不存在或其他错误
 */
const setProperty = async (userId, propertyData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // 将新的财产添加到用户的 properties 数组中
    user.properties.push({
        description: propertyData.title,
        amount: propertyData.amount,
    });

    // 保存用户信息
    await user.save();

    return user;
};

/**
 * 获取用户的所有财产
 * @param {String} userId - 用户的唯一 ID
 * @returns {Array} - 用户的财产列表
 * @throws {Error} - 如果用户不存在或其他错误
 */
const getProperty = async (userId) => {
    const user = await User.findById(userId).select("properties");

    if (!user) {
        throw new Error("User not found");
    }

    // 格式化返回的财产数据
    return user.properties.map((property) => ({
        title: property.description,
        amount: property.amount,
    }));
};

module.exports = { setProperty, getProperty };
