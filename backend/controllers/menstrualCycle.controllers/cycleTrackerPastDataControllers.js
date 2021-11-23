const Cycle = require("../../models/periodTracker.model");
const sendMail = require("../sendMail.Controllers");
const sendSMS = require("../SMS.controllers");
const UserModel = require("../../models/userModel");
const Menstrual2ndCircleData=require('../../models/MenstrualCircleData.models')


const cycleTrackerPastDataControllers = {
  getTotalDaysSincePeriod: async (req, res) => {
    let user = req.user.id;

    const { startDate, endDate } = req.body;

    await Cycle.find({ user: user })
      .then((ans) => {
        if(ans.length>0){
          const currentDate = new Date();
          const lastEndDate = ans[0]["endDate"];
          console.log(currentDate.getTime(), "         ", lastEndDate.getTime());
  
          // console.log(typeof(date2),'   ',typeof(currentDate))
          let diff = Math.abs(currentDate - lastEndDate);
          let cycleLength = diff / (1000 * 60 * 60 * 24);
          // console.log(Math.floor(cycleLength))
          res.send({CycleLength:Math.floor(cycleLength)});
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
        if(ans.length>0){
          const cycleLength = ans[0]["cycleLength"];
          console.log('cycleLength ',cycleLength)
          res.send({cycleLength:cycleLength});
        }
    
      })
      .catch((err) => {
        console.log(err);
      });
  },


};




module.exports = cycleTrackerPastDataControllers;