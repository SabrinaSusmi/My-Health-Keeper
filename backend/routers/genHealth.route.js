const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const {postHealthInfo,getWeightGraph} = require('../controllers/genHealthController');

router.post('/addGenHealth',auth,postHealthInfo);
router.get('/weightGraph',auth,getWeightGraph);

module.exports=router;