// routes/goalRoutes.js
const express = require("express");
const router = express.Router();
const { setFinancialGoalController, getFinancialGoalsController} = require("../controllers/goalController");

// 定义路由来设置财务目标
router.post("/users/:userId/goals", setFinancialGoalController);

// 定义路由来获取财务目标
router.get("/users/:userId/goals", getFinancialGoalsController);
module.exports = router;
