const ORCService = require("../services/AIAgentServices/ORCService");

const analyzeReceipt = async (req, res) => {
  try {
    if (!req.file) console.log("controller 没拿到文件");
    console.log("下面是req的内容");
    console.log(req);
    const transactionRecords = await ORCService(req.file);
    console.log(transactionRecords);
    //这里需要一个将交易记录存入数据库的service
    res.status(200).json({ message: "Transaction Records Generated." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { analyzeReceipt };
