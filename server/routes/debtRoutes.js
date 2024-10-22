// routes/debtRoutes.js
const express = require("express");
const router = express.Router();
const { setDebtController, getDebtsController } = require("../controllers/debtController");

// 定义路由来设置和获取债务
router.post("/users/:userId/debts", setDebtController);
router.get("/users/:userId/debts", getDebtsController);

module.exports = router;
