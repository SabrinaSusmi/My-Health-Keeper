const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const {postHealthInfo,getSugarData, getWeightData, getBpData, getPulseData} = require('../controllers/genHealthController');

router.post('/addGenHealth',auth,postHealthInfo);
// router.get('/getChart/:title',auth,getChartData);
router.get('/getChart/Sugar',auth,getSugarData);
router.get('/getChart/Weight',auth,getWeightData);
router.get('/getChart/Bp',auth,getBpData);
router.get('/getChart/Pulse',auth,getPulseData);

module.exports=router;