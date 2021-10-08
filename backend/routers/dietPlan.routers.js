const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const saveTargetInfo=require('../controllers/dietPlan.Controller/dietPlan.controllers')
const { postFood, getFood, deleteFood, getFoodMenu } = require('../controllers/dietPlan.Controller/consumedCalorie.controller')
const getMonthlyDietData =require('../controllers/dietPlan.Controller/dietProgress.controller')

router.post("/setup-target_info",saveTargetInfo);
router.post("/addFoodItem",auth,postFood);
router.get("/getFoodList",auth,getFood);
router.delete('/foodList/delete/:id',auth, deleteFood);

router.get("/getFoodMenu",auth, getFoodMenu);

router.get('/get_monthly_diet_data',auth,getMonthlyDietData)
module.exports = router;