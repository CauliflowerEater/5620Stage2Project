// routes/incomeRoutes.js
const express = require("express");
const router = express.Router();
const { setIncomeController, getIncomesController  } = require("../controllers/incomeController");

// 定义路由来设置收入
router.post("/users/:userId/incomes", setIncomeController);

// 定义路由来获取收入
router.get("/users/:userId/incomes", getIncomesController);
module.exports = router;
