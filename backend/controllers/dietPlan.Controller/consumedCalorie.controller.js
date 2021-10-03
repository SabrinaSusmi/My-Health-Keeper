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

  const calculateCalorie = (
    food, quantity
  ) => {
    let calorie=0;
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
                return calorie;
            }
            
        })

        // return calorie;
  }


  module.exports = { postFood };