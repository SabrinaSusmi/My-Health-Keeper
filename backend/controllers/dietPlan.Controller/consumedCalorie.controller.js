const consumedCalories = require("../../models/consumedCalories.model");
const calorie_charts = require("../../models/caloriesChart.models");
const DietTargetModel = require("../../models/diet.targetModel");
const dailyCalorie = require("../../models/dailyCalorie");
const { findOne } = require("../../models/consumedCalories.model");

const postFood = async (req, res) => {
    let user = req.user.id;
  
    const {
      meal,
      food,
      quantity,
    } = req.body;
    //const calorie = calculateCalorie(food, quantity);
    //console.log("main"+calorie);
    
    calorie_charts.find(
      {
        name: food,
      }, (err, data) =>{
          if(err) {
              console.log(user);
              console.log("Chart Data Food not found :" + err);
          }
          if(data) {
              //console.log(data[0].calories);
              foodCal = data[0].calories;
              //console.log(foodCal);
              calorie = quantity*foodCal;
              console.log(calorie);

              DietTargetModel.find({user:user}).sort({_id:-1}).limit(1).then((ans)=>{
                reqCal=ans[0]['dailyRequiredCalories']

                const foodItem = new consumedCalories({
                  user,
                  meal: meal,
                  food,
                  quantity: quantity,
                  consumedCalories: calorie,
                  date : new Date().toISOString().slice(0, 10),
                  requiredCalories:reqCal,
                });
                foodItem
                  .save()
                  .then((data) => {
                    dailyCalorie.findOne({
                      user : user,
                      date: new Date().toISOString().slice(0, 10),
                    })
                    .then((dailyCal) => {
                      if (dailyCal) {
                        cal = dailyCal.consumedCalories;
                        newCal = cal+calorie;
                        dailyCalorie.findOneAndUpdate({
                          user : user,
                          date: new Date().toISOString().slice(0, 10),
                        },
                          { consumedCalories: newCal })
                        .then((data) => console.log("Daily calorie updated"))
                        .catch((err) => console.log("Daily calorie update error : "+err));
                      }else {
                        const dailyConsumed = new dailyCalorie({
                          user,
                          consumedCalories: calorie,
                          requiredCalories:reqCal,
                          date : new Date().toISOString().slice(0, 10),
                        })
                        dailyConsumed.save().then(() => {
                          console.log("Data saved in daily calorie table")
                        }).catch((err) => console.log("Daily calorie entry error : "+err));
                      }
                    })
                    console.log("wxdwd ", reqcal)
                    res.json(data);
                    
                  })
                  .catch((error) => {
                    res.json(error);
                  });
              })
             
              
          }
          
      })
   };

const getFood = async (req, res) => {
  let user = req.user.id;
const todayDate=new Date()
todayDate.setDate(todayDate.getDate()-1)
consumedCalories.find({ user,date:new Date().toISOString().slice(0, 10) }, (err, foodList) => {
    if (err) {
      //console.log(user);
      console.log("Diet food get :" + err);
    }
    if (foodList) {
      //console.log(foodList);
      res.send(foodList);
     
    }
  });
}

const deleteFood = async (req, res) => {
  consumedCalories
        .findByIdAndDelete(req.params.id)
        .then(() => {
          res.json("Food deleted.")
          console.log("Food deleted.");
        })
        .catch((err) => res.status(400).json("Food delete Error: " + err));
}

const updateFood = async (req, res) => {
  let user = req.user.id;
  const {food, meal, gender} = req.body
            // await User.findOneAndUpdate({_id: req.user.id}, {
            //     name,phone,gender
            // })
}


  module.exports = { postFood, getFood, deleteFood };