// services/transactionService.js
const User = require("../../models/User");

/**
 * 获取用户的交易记录
 * @param {String} userId - 用户的唯一 ID
 * @returns {Array} - 用户的交易记录数组
 * @throws {Error} - 如果用户不存在或其他错误
 */
const getTransactionRecords = async (userId) => {
  // 查找用户，并只选择 accountbook 字段
  const user = await User.findById(userId).select("accountbook");

  if (!user) {
    throw new Error("User not found");
  }

  // 格式化交易记录
  return user.accountbook.map((record) => ({
    title: record.title, // 使用 transactionType 作为 title
    type: record.transactionType, // 这里假设 title 和 type 一样
    amount: record.amount,
    date: record.date,
  }));
};
const setTransactionRecord = async (userId, transactions) => {
  const user = await User.findById(userId);
  console.log(transactions);
  if (!user) {
    throw new Error("User not found");
  }
  //去掉返回值中多余的符号
  const cleanedData = transactions.replace(/json|`/g, "").trim();

  // 将字符串格式的transactions转化为array.
  let newTransactions;
  try {
    newTransactions = JSON.parse(cleanedData);
  } catch (error) {
    console.error("failed to parse JSON");
  }

  // 检查传入的每一个 transaction 是否包含所需的字段
  newTransactions.forEach((transaction) => {
    if (
      !transaction.title ||
      !transaction.transactionType ||
      !transaction.amount ||
      !transaction.date
    ) {
      throw new Error(
        "Each transaction must include title, transactionType, amount, and date"
      );
    }
  });

  // 将新的交易记录添加到用户的 accountbook 中
  user.accountbook.push(...newTransactions);

  // 保存用户信息
  await user.save();

  return user;
};
module.exports = { getTransactionRecords, setTransactionRecord };
