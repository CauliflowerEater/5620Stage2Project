const ORCService = require("../services/AIAgentServices/ORCService");

const analyzeReceipt = async (req, res) => {
  const { receipt } = req.body;
  try {
    const transactionRecords = await ORCService(receipt);
    //这里需要一个将交易记录存入数据库的service
    res.status(200).json({ message: "Transaction Records Generated." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { analyzeReceipt };
