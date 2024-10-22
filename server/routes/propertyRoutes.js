// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const { setPropertyController, getPropertyController } = require("../controllers/propertyController");

// 定义路由来设置和获取财产
/**
 * @swagger
 * /users/{userId}/properties:
 *   post:
 *     summary: Set a new property for a user
 *     description: This API allows you to add a new property to a user’s list, including the property title and amount.
 *     tags: [Property Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     requestBody:
 *       description: Property details including title and amount
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title or description of the property
 *               amount:
 *                 type: number
 *                 description: The value of the property
 *     responses:
 *       200:
 *         description: Property added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Property added successfully
 *                 properties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *       400:
 *         description: Error in adding property
 */
router.post("/users/:userId/properties", setPropertyController);

/**
 * @swagger
 * /users/{userId}/properties:
 *   get:
 *     summary: Get all properties for a user
 *     description: This API fetches all the properties of a user by their userId.
 *     tags: [Property Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's properties
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
 *         description: Error retrieving properties
 */
router.get("/users/:userId/properties", getPropertyController);

module.exports = router;
