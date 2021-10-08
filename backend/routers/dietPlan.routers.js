const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const saveTargetInfo=require('../controllers/dietPlan.Controller/dietPlan.controllers')
const { postFood, getFood, deleteFood, getFoodMenu } = require('../controllers/dietPlan.Controller/consumedCalorie.controller')


router.post("/setup-target_info",saveTargetInfo);
router.post("/addFoodItem",auth,postFood);
router.get("/getFoodList",auth,getFood);
router.delete('/foodList/delete/:id',auth, deleteFood);

router.get("/getFoodMenu/:cat",auth, getFoodMenu);
module.exports = router;