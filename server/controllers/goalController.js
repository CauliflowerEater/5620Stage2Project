// controllers/goalController.js
const { setFinancialGoal, getFinancialGoals} = require("../services/userServices/goalService");

const setFinancialGoalController = async (req, res) => {
    const { userId } = req.params;
    const { title, amount, date } = req.body;

    try {
        const goalData = { title, amount, date };
        const updatedUser = await setFinancialGoal(userId, goalData);

        res.status(200).json({
            message: "Financial goal added successfully",
            goals: updatedUser.goals,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


/**
 * 获取用户所有财务目标的控制器
 */
const getFinancialGoalsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const goals = await getFinancialGoals(userId);
        res.status(200).json(goals);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { setFinancialGoalController,getFinancialGoalsController };
