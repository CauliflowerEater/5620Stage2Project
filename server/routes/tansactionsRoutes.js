// routes/transactions.js
const express = require("express");
const router = express.Router();
const { getTransactionRecordsController,setTransactionRecordController } = require("../controllers/TransactionRecordController");

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
// 定义路由设置交易记录

/**
 * @swagger
 * /users/{userId}/transactions:
 *   post:
 *     summary: Add new transaction records for a user
 *     description: This API allows you to add new transaction records for a user. Each transaction must include title, transactionType, amount, and date.
 *     tags: [Transaction Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: List of transactions to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 transactionType:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 *     responses:
 *       200:
 *         description: Transactions added successfully
 *       400:
 *         description: Error in adding transactions
 */
router.post("/users/:userId/transactions", setTransactionRecordController);


module.exports = router;
