const Cycle = require("../../models/periodTracker.model");

const UserModel = require("../../models/userModel");
const MenstrualCircleDataModels = require("../../models/MenstrualCircleData.models");

const cycleTrackerPastDataControllers = {
  getGraphData: async (req, res) => {
    let user = req.user.id;
    let selectedyear = req.headers["year"];
    let cycleLengthArray = [];
    let durationLengthArray = [];
    let monthArray = [];
    let totalCal = 0;
    let burn_data=[]
    console.log("getMonthlyDietData ", selectedyear);
  
    MenstrualCircleDataModels.find({ user }, (err, data) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let split_date = String(data[i]["startDate"]).split(" ");
          console.log(split_date);
          if ( split_date[3] == selectedyear) {
              month_split=String(data[i]['startDate']).split(' ')
            // totalCal = totalCal + data[i]["consumedCalories"]-data[i]['burnedCalories'];
            cycleLengthArray.push(data[i]["cycleLength"]);
            durationLengthArray.push(data[i]["duration"]);
            monthArray.push(month_split[1]);
            // burn_data.push(data[i]['burnedCalories'])
          }
        }
        console.log(
       
          "      durationLengthArray ",
          durationLengthArray,
          "         monthArray",
          monthArray,
          "       cycleLengthArray",
          cycleLengthArray
        );
        res.send({
            cycleLengthArray: cycleLengthArray,
            durationLengthArray: durationLengthArray,
            monthArray: monthArray,
        //   totalCal: (totalCal / 30).toFixed(2),
        //   burn_data:burn_data,
        });
      }
    });
  },
  getTotalDaysSincePeriod: async (req, res) => {
    let user = req.user.id;

    const { startDate, endDate } = req.body;

    await Cycle.find({ user: user })
      .then((ans) => {
        if (ans.length > 0) {
          const currentDate = new Date();
          const lastEndDate = ans[0]["endDate"];
          console.log(
            currentDate.getTime(),
            "         ",
            lastEndDate.getTime()
          );

          // console.log(typeof(date2),'   ',typeof(currentDate))
          let diff = Math.abs(currentDate - lastEndDate);
          let cycleLength = diff / (1000 * 60 * 60 * 24);
          // console.log(Math.floor(cycleLength))
          res.send({ CycleLength: Math.floor(cycleLength) });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCycleLength: async (req, res) => {
    let user = req.user.id;

    await Cycle.find({ user: user })
      .then((ans) => {
        if (ans.length > 0) {
          const cycleLength = ans[0]["cycleLength"];
          console.log("cycleLength ", cycleLength);
          res.send({ cycleLength: cycleLength });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  
  getDurationOfLastCycle: async (req, res) => {
    let user = req.user.id;

    await Cycle.find({ user: user })
      .then((ans) => {
        if (ans.length > 0) {
          const duration = ans[0]["duration"];
          console.log("duration ", duration);
          res.send({ duration: duration });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = cycleTrackerPastDataControllers;
