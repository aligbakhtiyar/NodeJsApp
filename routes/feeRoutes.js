const express = require("express");
const router = express.Router();
const { getFeeDetails, createOrUpdateFee } = require("../controller/feeController");

router.get("/fee-details", getFeeDetails);           // GET by programName
router.post("/fee-details", createOrUpdateFee);      // Create or update

module.exports = router;
