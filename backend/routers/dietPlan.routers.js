const express = require("express");
const router = express.Router();
const saveTargetInfo=require('../controllers/dietPlan.Controller/dietPlan.controllers')


router.post("/setup-target_info",saveTargetInfo);


module.exports = router;
