const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/userController");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: This API allows a new user to register by providing a username, password, and email.
 *     tags: [User Management]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Error in registering user
 */
router.post("/users/register", registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: This API allows an existing user to log in by providing a username and password.
 *     tags: [User Management]
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Error in user login
 */
router.post("/users/login", loginUser);

module.exports = router;
