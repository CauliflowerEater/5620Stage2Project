const express = require("express");
const router = express.Router();
const {
    storeAdviceReportController,
    getAdviceReportsController, 
    getAdviceReportsFromDataPoolController
} = require("../controllers/adviceReportController");

// Routes for operation about advice reports
/**
 * @swagger
 * /users/{userId}/advice-reports:
 *   post:
 *     summary: Store a new advice report for a user
 *     description: This API stores a new advice report for a user based on their userId.
 *     tags: [Advice Reports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: The advice report to be stored
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adviceType:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Advice report stored successfully
 *       400:
 *         description: Error in storing advice report
 */
router.post("/users/:userId/advice-reports", storeAdviceReportController);

/**
 * @swagger
 * /users/{userId}/advice-reports:
 *   get:
 *     summary: Get a user's advice reports
 *     description: This API fetches all advice reports for a specific user by userId.
 *     tags: [Advice Reports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's advice reports
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
 *         description: Error retrieving advice reports
 */
router.get("/users/:userId/advice-reports", getAdviceReportsController);

/**
 * @swagger
 * /data-pool/advice-reports:
 *   get:
 *     summary: Get all advice reports from DataPool
 *     description: This API fetches all advice reports stored in DataPool.
 *     tags: [Advice Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved all advice reports from DataPool
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
 *         description: Error retrieving advice reports from DataPool
 */
router.get("/data-pool/advice-reports", getAdviceReportsFromDataPoolController);

module.exports = router;
