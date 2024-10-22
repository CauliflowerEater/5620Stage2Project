// controllers/incomeController.js
const { setIncome, getIncomes } = require("../services/userServices/incomeService");

/**
 * 设置用户收入的控制器
 * @param {Object} req - 请求对象，包含 userId 和收入数据
 * @param {Object} res - 响应对象，用于返回数据
 */
const setIncomeController = async (req, res) => {
    const { userId } = req.params;
    const { title, amount } = req.body;

    // 检查必填字段是否存在
    if (!title || !amount) {
        return res.status(400).json({
            message: "Description and amount are required",
        });
    }

    try {
        const incomeData = { title, amount };
        const updatedUser = await setIncome(userId, incomeData);

        res.status(200).json({
            message: "Income added successfully",
            incomes: updatedUser.incomes,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/**
 * 获取用户所有收入的控制器
 * @param {Object} req - 请求对象，包含 userId 参数
 * @param {Object} res - 响应对象，用于返回数据
 */
const getIncomesController = async (req, res) => {
    const { userId } = req.params;

    try {
        const incomes = await getIncomes(userId);
        res.status(200).json(incomes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = { setIncomeController, getIncomesController };
