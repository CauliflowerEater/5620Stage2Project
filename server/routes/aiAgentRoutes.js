const express = require("express");
const { analyzeReceipt } = require("../controllers/AIAgentController");
const router = express.Router();

router.post("/receipt", analyzeReceipt);

module.exports = router;
