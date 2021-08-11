const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const {postHealthInfo,getChartData} = require('../controllers/genHealthController');

router.post('/addGenHealth',auth,postHealthInfo);
router.get('/getChart/:title',auth,getChartData);

module.exports=router;