// controllers/transactionController.js
const { setTransactionRecord } = require("../services/userServices/transactionService");

const setTransactionRecordController = async (req, res) => {
    const { userId } = req.params;
    const transactions = req.body;


    try {
        console.log(transactions)
        const updatedUser = await setTransactionRecord(userId, transactions);

        res.status(200).json({
            message: "Transaction records added successfully",
            accountbook: updatedUser.accountbook,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTransactionRecordsController = async (req, res) => {
    const { userId } = req.params;
    try {
        const transactionRecords = await getTransactionRecords(userId);
        res.status(200).json(transactionRecords);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { setTransactionRecordController,getTransactionRecordsController };
