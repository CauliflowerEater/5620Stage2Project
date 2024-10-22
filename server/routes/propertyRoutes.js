// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const { setPropertyController, getPropertyController } = require("../controllers/propertyController");

// 定义路由来设置和获取财产
router.post("/users/:userId/properties", setPropertyController);
router.get("/users/:userId/properties", getPropertyController);

module.exports = router;
