const express = require("express");
const router = express.Router();
const { reports } = require("../controllers/reports.controller");

router.get('/reports',reports)

module.exports = router;