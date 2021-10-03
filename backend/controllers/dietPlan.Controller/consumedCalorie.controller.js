const consumedCalories = require("../../models/consumedCalories.model");
const calorie_charts = require("../../models/caloriesChart.models");

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
              console.log(foodCal);
              calorie = quantity*foodCal;
              console.log(calorie);

              const foodItem = new consumedCalories({
                user,
                meal: meal,
                food,
                quantity: quantity,
                consumedCalories: calorie,
                date : new Date().toISOString().slice(0, 10)
              });
              foodItem
                .save()
                .then((data) => {
                  res.json(data);
                  
                })
                .catch((error) => {
                  res.json(error);
                });
              
          }
          
      })
   };

const getFood = async (req, res) => {
  let user = req.user.id;
const todayDate=new Date()
console.log(todayDate);
todayDate.setDate(todayDate.getDate()-1)
console.log(todayDate);
consumedCalories.find({ user,date:{$gte:todayDate} }, (err, foodList) => {
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


  module.exports = { postFood, getFood };