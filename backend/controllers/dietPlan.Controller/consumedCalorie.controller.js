const consumedCalories = require("../../models/consumedCalories.model");
const calorie_charts = require("../../models/caloriesChart.models");

const postFood = async (req, res) => {
    let user = req.user.id;
  
    const {
      meal,
      food,
      quantity,
    } = req.body;

    var calorie = null;

    calorie_charts.find(
        {
          name: food,
        }, (err, data) =>{
            if(err) {
                console.log(user);
                console.log("Chart Data Food not found :" + err);
            }
            if(data) {
                health_data = data;
                foodCal = data.calories;
                calorie = quantity*foodCal;
                console.log(calorie);
            }
            
        })
  
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
  };


  module.exports = { postFood };