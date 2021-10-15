const consumedCalories = require("../../models/consumedCalories.model");
const calorie_charts = require("../../models/caloriesChart.models");
const DietTargetModel = require("../../models/diet.targetModel");
const DailyCalorie = require("../../models/dailyCalorie");



const getMonthlyDietData = async (req, res) => {
  let user = req.user.id;
  let selectedMonth = req.headers["months"];

  let consumed_cal_data = [];
  let req_cal_data = [];
  let cal_date=[]
  let totalCal=0
  console.log("getMonthlyDietData ", selectedMonth);

  DailyCalorie.find({ user }, (err, data) => {
    if (data) {
      for(let i=0;i<data.length;i++){
        let split_date = String(data[i]["date"]).split(" ")
        // console.log(split_date[1])
        if(split_date[1]==selectedMonth){
         totalCal=totalCal+data[i]['consumedCalories']
          consumed_cal_data.push(data[i]['consumedCalories'])
          req_cal_data.push(data[i]['requiredCalories'])
          cal_date.push(data[i]['date'].toISOString().slice(0, 10))

        }
      }
      console.log("cons ",consumed_cal_data,'      req ',req_cal_data,'         date',cal_date,"       vv",totalCal)
      res.send({ consume_cal: consumed_cal_data, req_cal: req_cal_data , cal_date:cal_date, totalCal:totalCal/30});
       }
  });

};

module.exports = getMonthlyDietData;
