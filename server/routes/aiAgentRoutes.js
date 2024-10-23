const express = require("express");
const { analyzeReceipt } = require("../controllers/AIAgentController");
const router = express.Router();


/**
 * @swagger
 * /receipt:
 *   post:
 *     summary: Analyze receipt using OCR and generate transaction records
 *     description: This API takes a base64 encoded receipt image, sends it to the OpenAI API for OCR processing, and categorizes the items into transaction records. The records are returned in a structured format, and the transaction details are generated for each item.
 *     tags: [Receipt Analysis]
 *     requestBody:
 *       description: Base64 encoded image of the receipt
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receipt:
 *                 type: string
 *                 description: The base64 encoded image of the receipt
 *     responses:
 *       200:
 *         description: Successfully analyzed the receipt and generated transaction records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction Records Generated.
 *       400:
 *         description: Error during receipt analysis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */
router.post("/receipt", analyzeReceipt);

module.exports = router;
