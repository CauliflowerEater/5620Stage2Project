const express = require("express");
const router = express.Router();
const {
    storeAdviceReportController,
    getAdviceReportsController, 
    getAdviceReportsFromDataPoolController
} = require("../controllers/adviceReportController");

// Routes for operation about advice reports
router.post("/users/:userId/advice-reports", storeAdviceReportController);
router.get("/users/:userId/advice-reports", getAdviceReportsController);
router.get("/data-pool/advice-reports", getAdviceReportsFromDataPoolController);

module.exports = router;
