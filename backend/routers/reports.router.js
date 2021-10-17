const express = require("express");
const router = express.Router();
const { reports } = require("../controllers/reports.controller");
const { upload } = require("../utilities/filehelper");

// router.get('/reports',upload.single("file"), reports)
router.post('/reports_predict',upload.single("file"), reports)
module.exports = router;