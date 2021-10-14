const consumedCalories = require("../../models/consumedCalories.model");
const calorie_charts = require("../../models/caloriesChart.models");
const DietTargetModel = require("../../models/diet.targetModel");
const dailyCalorie = require("../../models/dailyCalorie");
const { findOne } = require("../../models/consumedCalories.model");

const postFood = async (req, res) => {
  let user = req.user.id;

  const { meal, food, quantity } = req.body;
  //const calorie = calculateCalorie(food, quantity);
  //console.log("main"+calorie);

  calorie_charts.find(
    {
      name: food,
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data Food not found :" + err);
      }
      if (data) {
        console.log(data);
        foodCal = data[0].calories;
        //console.log(foodCal);
        calorie = quantity * foodCal;
        console.log(calorie);

        DietTargetModel.find({ user: user })
          .sort({ _id: -1 })
          .limit(1)
          .then((ans) => {
            reqCal = ans[0]["dailyRequiredCalories"];

            const foodItem = new consumedCalories({
              user,
              meal: meal,
              food: food,
              quantity: quantity,
              consumedCalories: calorie,
              date: new Date().toISOString().slice(0, 10),
              requiredCalories: reqCal,
            });
            foodItem
              .save()
              .then((data) => {
                console.log("food saved");
                dailyCalorie
                  .findOne({
                    user: user,
                    date: new Date().toISOString().slice(0, 10),
                  })
                  .then((dailyCal) => {
                    if (dailyCal) {
                      cal = dailyCal.consumedCalories;
                      newCal = cal + calorie;
                      dailyCalorie
                        .findOneAndUpdate(
                          {
                            user: user,
                            date: new Date().toISOString().slice(0, 10),
                          },
                          { consumedCalories: newCal }
                        )
                        .then((data) => console.log("Daily calorie updated"))
                        .catch((err) =>
                          console.log("Daily calorie update error : " + err)
                        );
                    } else {
                      const dailyConsumed = new dailyCalorie({
                        user,
                        consumedCalories: calorie,
                        requiredCalories: reqCal,
                        date: new Date().toISOString().slice(0, 10),
                      });
                      dailyConsumed
                        .save()
                        .then(() => {
                          console.log("Data saved in daily calorie table");
                        })
                        .catch((err) =>
                          console.log("Daily calorie entry error : " + err)
                        );
                    }
                  });
                console.log("wxdwd ", reqcal);
                res.json(data);
              })
              .catch((error) => {
                res.json(error);
              });
          });
      }
    }
  );
};

const getFood = async (req, res) => {
  let user = req.user.id;
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() - 1);
  consumedCalories.find(
    { user, date: new Date().toISOString().slice(0, 10) },
    (err, foodList) => {
      if (err) {
        //console.log(user);
        console.log("Diet food get :" + err);
      }
      if (foodList) {
        //console.log(foodList);
        res.send(foodList);
      }
    }
  );
};

const deleteFood = async (req, res) => {
  let user = req.user.id;
  consumedCalories.findById(req.params.id).then((data) => {
    calorie = data.consumedCalories;
    consumedCalories
      .findByIdAndDelete(req.params.id)
      .then(() => {
        dailyCalorie
          .findOne({
            user: user,
            date: new Date().toISOString().slice(0, 10),
          })
          .then((dailyCal) => {
            cal = dailyCal.consumedCalories;
            newCal = cal - calorie;
            dailyCalorie
              .findOneAndUpdate(
                {
                  user: user,
                  date: new Date().toISOString().slice(0, 10),
                },
                { consumedCalories: newCal }
              )
              .then((data) => console.log("Daily calorie updated"))
              .catch((err) =>
                console.log("Daily calorie update error : " + err)
              );
            res.json("Food deleted.");
            console.log("Food deleted.");
          });
      })
      .catch((err) => res.status(400).json("Food delete Error: " + err));
  });
};

const updateFood = async (req, res) => {
  let user = req.user.id;
  const { food, meal, gender } = req.body;
  // await User.findOneAndUpdate({_id: req.user.id}, {
  //     name,phone,gender
  // })
};

const getFoodMenu = async (req, res) => {
  calorie_charts
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getDietSummaryOfTheDay = async (req, res) => {
  user = req.user.id;
  dates = new Date().toISOString().slice(0, 10);
  console.log(dates);
  // ,date:{'$reqex':dates}
  dailyCalorie
    .find({ user: user })
    .then((data) => {
      let dateElement = [];
      data.forEach((element) => {
        if (element.date.toISOString().slice(0, 10) == dates) {
          dateElement.push(element);
          console.log("dhbhynd ", element.date.toISOString().slice(0, 10));
          // res.send(element);
        
        }
        
      });
      console.log(dateElement[0]);
      res.send(dateElement[0])

    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  postFood,
  getFood,
  deleteFood,
  getFoodMenu,
  getDietSummaryOfTheDay,
};
