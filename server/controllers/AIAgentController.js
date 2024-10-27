const ORCService = require("../services/AIAgentServices/ORCService");
const {
  setTransactionRecord,
} = require("../services/userServices/transactionService");

const analyzeReceipt = async (req, res) => {
  try {
    if (!req.file) console.log("controller 没拿到文件");
    const transactionRecords = await ORCService(req.file);
    // console.log(transactionRecords);
    //这里需要一个将交易记录存入数据库的service
    setTransactionRecord("670e765e68539d177763c2e7", transactionRecords);

    res.status(200).json({ message: "Transaction Records Generated." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { analyzeReceipt };
