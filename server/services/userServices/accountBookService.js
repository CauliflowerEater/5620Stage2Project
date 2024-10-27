const User = require("../../models/User");

const getTransactionRecords = async (userId) => {
  // 查找用户，并只选择 账单 字段
  const user = await User.findById(userId).select("accountbook");

  if (!user) {
    throw new Error("User not found");
  }

  // 格式化返回的账单数据
  return user.accountbook.map((transactionRecord) => ({
    title: transactionRecord.title,
    transactionType: transactionRecord.transactionType,
    amount: transactionRecord.amount,
    date: transactionRecord.date,
  }));
};
module.exports = getTransactionRecords;
