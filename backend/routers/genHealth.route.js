const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  postHealthInfo,
  getSugarData,
  getWeightData,
  getBpSysData,
  getBpDiasData,
  getPulseData,
  getHistory,
  getMonthlyHistory
} = require("../controllers/genHealthController");

router.post("/addGenHealth", auth, postHealthInfo);
// router.get('/getChart/:title',auth,getChartData);
router.get("/getChart/Sugar", auth, getSugarData);
router.get("/getChart/Weight", auth, getWeightData);
router.get("/getChart/Bp_sys", auth, getBpSysData);
router.get("/getChart/Bp_dias", auth, getBpDiasData);
router.get("/getChart/Pulse", auth, getPulseData);
router.get("/genHealthHistory",auth, getHistory);
router.get("/genHealthMonthlyHistory",auth, getMonthlyHistory);

module.exports = router;
