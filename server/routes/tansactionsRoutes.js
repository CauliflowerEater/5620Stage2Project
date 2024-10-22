// routes/transactions.js
const express = require("express");
const router = express.Router();
const { getTransactionRecordsController } = require("../controllers/userController");

// 定义路由来获取交易记录
router.get("/users/:userId/transactions", getTransactionRecordsController);

module.exports = router;
