// routes/debtRoutes.js
const express = require("express");
const router = express.Router();
const { setDebtController, getDebtsController } = require("../controllers/debtController");

// 定义路由来设置和获取债务
/**
 * @swagger
 * /users/{userId}/debts:
 *   post:
 *     summary: Set a new debt for a user
 *     description: This API allows you to add a new debt for a user, including the debt title and amount.
 *     tags: [Debt Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: Debt details including title and amount
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title or description of the debt
 *               amount:
 *                 type: number
 *                 description: The amount of the debt
 *     responses:
 *       200:
 *         description: Debt added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Debt added successfully
 *                 debts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *       400:
 *         description: Error in adding debt
 */
router.post("/users/:userId/debts", setDebtController);

/**
 * @swagger
 * /users/{userId}/debts:
 *   get:
 *     summary: Get all debts for a user
 *     description: This API fetches all the debts of a user by their userId.
 *     tags: [Debt Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's debts
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
 *         description: Error retrieving debts
 */
router.get("/users/:userId/debts", getDebtsController);

module.exports = router;
