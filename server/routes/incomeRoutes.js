// routes/incomeRoutes.js
const express = require("express");
const router = express.Router();
const { setIncomeController, getIncomesController  } = require("../controllers/incomeController");

// 定义路由来设置收入
/**
 * @swagger
 * /users/{userId}/incomes:
 *   post:
 *     summary: Set a new income for a user
 *     description: This API allows you to add a new income record for a user, including the income title and amount.
 *     tags: [Income Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: Income details including title and amount
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title or description of the income
 *               amount:
 *                 type: number
 *                 description: The amount of the income
 *     responses:
 *       200:
 *         description: Income added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Income added successfully
 *                 incomes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *       400:
 *         description: Error in adding income
 */
router.post("/users/:userId/incomes", setIncomeController);

// 定义路由来获取收入
/**
 * @swagger
 * /users/{userId}/incomes:
 *   get:
 *     summary: Get all incomes for a user
 *     description: This API fetches all the income records of a user by their userId.
 *     tags: [Income Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's incomes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   amount:
 *                     type: number
 *       400:
 *         description: Error retrieving incomes
 */
router.get("/users/:userId/incomes", getIncomesController);
module.exports = router;
