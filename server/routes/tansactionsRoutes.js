// routes/transactions.js
const express = require("express");
const router = express.Router();
const { getTransactionRecordsController } = require("../controllers/userController");

// 定义路由来获取交易记录
/**
 * @swagger
 * /users/{userId}/transactions:
 *   get:
 *     summary: Get transaction records for a user
 *     description: This API fetches the transaction records of a specific user by their userId.
 *     tags: [Transaction Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   type:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Error retrieving transaction records
 */
router.get("/users/:userId/transactions", getTransactionRecordsController);

module.exports = router;
