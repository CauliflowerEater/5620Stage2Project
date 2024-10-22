// routes/transactions.js
const express = require("express");
const router = express.Router();
const { getTransactionRecordsController,setTransactionRecordController } = require("../controllers/TransactionRecordController");

// 定义路由来获取交易记录
router.get("/users/:userId/transactions", getTransactionRecordsController);
// 定义路由设置交易记录
router.post("/users/:userId/transactions", setTransactionRecordController);


module.exports = router;
