// controllers/debtController.js
const { setDebt, getDebts } = require("../services/userServices/debtService");

/**
 * 设置用户债务的控制器
 * @param {Object} req - 请求对象，包含 userId 和债务数据
 * @param {Object} res - 响应对象，用于返回数据
 */
const setDebtController = async (req, res) => {
    const { userId } = req.params;
    const { title, amount } = req.body;

    try {
        const debtData = { title, amount };
        const updatedUser = await setDebt(userId, debtData);

        res.status(200).json({
            message: "Debt added successfully",
            debts: updatedUser.debts,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 获取用户所有债务的控制器
 * @param {Object} req - 请求对象，包含 userId 参数
 * @param {Object} res - 响应对象，用于返回数据
 */
const getDebtsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const debts = await getDebts(userId);
        res.status(200).json(debts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { setDebtController, getDebtsController };
