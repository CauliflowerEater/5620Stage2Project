// routes/conditionReportRoutes.js
const express = require("express");
const router = express.Router();
const {
    storeConditionReportController,
    getConditionReportsController,
    getConditionReportsFromDataPoolController
} = require("../controllers/conditionReportController");

// 定义路由来存储和获取 condition report

/**
 * @swagger
 * /users/{userId}/condition-reports:
 *   post:
 *     summary: Store a new condition report for a user
 *     description: This API stores a new condition report for a user based on their userId.
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: The condition report to be stored
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Condition report stored successfully
 *       400:
 *         description: Error in storing condition report
 */
router.post("/users/:userId/condition-reports", storeConditionReportController);

/**
 * @swagger
 * /users/{userId}/condition-reports:
 *   get:
 *     summary: Get a user's condition reports
 *     description: This API fetches all condition reports for a specific user by userId.
 *     tags: [Condition Reports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's condition reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Error retrieving condition reports
 */
router.get("/users/:userId/condition-reports", getConditionReportsController);

/**
 * @swagger
 * /data-pool/condition-reports:
 *   get:
 *     summary: Get all condition reports from DataPool
 *     description: This API fetches all condition reports stored in DataPool.
 *     tags: [Condition Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved all condition reports from DataPool
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Error retrieving condition reports from DataPool
 */
router.get("/data-pool/condition-reports", getConditionReportsFromDataPoolController);

module.exports = router;
