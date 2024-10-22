// controllers/propertyController.js
const { setProperty, getProperty } = require("../services/userServices/propertyService");

/**
 * 设置用户财产的控制器
 * @param {Object} req - 请求对象，包含 userId 和财产数据
 * @param {Object} res - 响应对象，用于返回数据
 */
const setPropertyController = async (req, res) => {
    const { userId } = req.params;
    const { title, amount } = req.body;

    try {
        const propertyData = { title, amount };
        const updatedUser = await setProperty(userId, propertyData);

        res.status(200).json({
            message: "Property added successfully",
            properties: updatedUser.properties,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 获取用户所有财产的控制器
 * @param {Object} req - 请求对象，包含 userId 参数
 * @param {Object} res - 响应对象，用于返回数据
 */
const getPropertyController = async (req, res) => {
    const { userId } = req.params;

    try {
        const properties = await getProperty(userId);
        res.status(200).json(properties);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { setPropertyController, getPropertyController };
