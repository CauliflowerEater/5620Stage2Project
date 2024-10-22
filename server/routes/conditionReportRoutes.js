// routes/conditionReportRoutes.js
const express = require("express");
const router = express.Router();
const {
    storeConditionReportController,
    getConditionReportsController,
} = require("../controllers/conditionReportController");

// 定义路由来存储和获取 condition report
router.post("/users/:userId/condition-reports", storeConditionReportController);
router.get("/users/:userId/condition-reports", getConditionReportsController);

module.exports = router;
