// routes/goalRoutes.js
const express = require("express");
const router = express.Router();
const { setFinancialGoalController, getFinancialGoalsController} = require("../controllers/goalController");


/**
 * @swagger
 * /users/{userId}/goals:
 *   post:
 *     summary: Set a new financial goal for a user
 *     description: This API allows you to add a new financial goal for a user, including the goal title, amount, and target date.
 *     tags: [Financial Goals Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: Financial goal details including title, amount, and date
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title or description of the financial goal
 *               amount:
 *                 type: number
 *                 description: The target amount for the financial goal
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The target date for achieving the goal
 *     responses:
 *       200:
 *         description: Financial goal added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Financial goal added successfully
 *                 goals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       date:
 *                         type: string
 *                         format: date
 *       400:
 *         description: Error in adding financial goal
 */
router.post("/users/:userId/goals", setFinancialGoalController);

/**
 * @swagger
 * /users/{userId}/goals:
 *   get:
 *     summary: Get all financial goals for a user
 *     description: This API fetches all the financial goals of a user by their userId.
 *     tags: [Financial Goals Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's financial goals
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
 *                   date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Error retrieving financial goals
 */
router.get("/users/:userId/goals", getFinancialGoalsController);
module.exports = router;
