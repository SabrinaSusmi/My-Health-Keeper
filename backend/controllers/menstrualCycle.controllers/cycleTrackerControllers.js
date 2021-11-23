const Cycle = require("../../models/periodTracker.model");
const sendMail = require("../sendMail.Controllers");
const sendSMS = require("../SMS.controllers");
const UserModel = require("../../models/userModel");
const Menstrual2ndCircleData=require('../../models/MenstrualCircleData.models')


setInterval(() => {
  Cycle.find({}, (err, reminder) => {
    if (err) {
      console.log("cycle notification: ", err);
    }
    if (reminder) {
      //for loop reminder.size,
      for (i = 0; i < reminder.length; i++) {
        if (!reminder[i].isReminded) {
          const now = new Date();
          const lastEndDate = new Date(reminder[i].endDate);
          const nextDay = reminder[i].cycleLength - 5;
          const periodDate = new Date(
            lastEndDate.setTime(lastEndDate.getTime() + nextDay * 86400000)
          );
          if (periodDate - now < 0) {
            Cycle.findByIdAndUpdate(
              reminder[i]._id,
              { isReminded: true },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }
                const nextDate = new Date(
                  remind.endDate.setTime(
                    remind.endDate.getTime() + remind.cycleLength * 86400000
                  )
                );
                let msg = `Get ready for your PERIOD !!  \n Your probable date : ${nextDate}`;
                UserModel.find({ email: remind.userEmail }).then((res1) => {
                  const userPhone = res1[0].phone;
                  sendSMS(userPhone, msg);
                });
                sendMail(remind.userEmail, "", msg, "", "");
              }
            );
          }
        }
      }
    }
  });
}, 6000);

const cycleTrackerControllers = {
 
  updateInitialData: async (req, res) => {
    try {
      let user = req.user.id;
// this.getCycleLength()
      const { startDate, endDate } = req.body;

      await Cycle.find({ user: user })
        .then((ans) => {
          const ss = endDate + "T00:00:00.000Z";
          const currentEndDate = new Date(ss);
          const start = startDate + "T00:00:00.000Z";
          const currentStartDate = new Date(start);
          const lastEndDate = ans[0]["endDate"];
          console.log(currentEndDate, "         ", lastEndDate);

          // console.log(typeof(date2),'   ',typeof(currentDate))
          let diff = Math.abs(currentEndDate - lastEndDate);
          let cycleLength = diff / (1000 * 60 * 60 * 24);
          let durationDiff = Math.abs(currentEndDate - currentStartDate);
          let duration = durationDiff / (1000 * 60 * 60 * 24);
          console.log("mens  ", cycleLength);
          saveMenstrual2ndCircleData( user, startDate, endDate, cycleLength, res,duration);
          
          Cycle.findOneAndUpdate(
            { user: user },
            { 
              startDate: startDate,
              endDate: endDate,
              isReminded: false,
              cycleLength: cycleLength,
              duration:duration,
            }
          ).then(() => {
            console.log("updateInitialData ", startDate);
            return res.json({ msg: "Update Success!" });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },
  isInitialDataAvailable: async (req, res) => {
    try {
      let user = req.user.id;

      const check = await Cycle.findOne({
        user,
      });

      if (check) {
        console.log("cddbaqhgd ");
        console.log(check.startDate);
        return res.json(check);
      }
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    let user = req.user.id;
    const { startDate, endDate, duration, cycleLength, userEmail } = req.body;
    if (!startDate || !endDate || !duration || !cycleLength)
      return res.json({ msg: "Please fill in all fields." });

    const initialinfo = new Cycle({
      user: user,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      cycleLength: cycleLength,
      userEmail: userEmail,
    });
    await initialinfo
      .save()
      .then(() => {
        return res.json({
          msg: "Initial data is saved.  Please refresh the page now",
        });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
};

module.exports = cycleTrackerControllers;
function saveMenstrual2ndCircleData( user, startDate, endDate, cycleLength, res,duration) {

  const initialinfo = new Menstrual2ndCircleData({
    user: user,
    startDate: startDate,
    endDate: endDate,
    duration: duration,
    cycleLength: cycleLength,
  });
  initialinfo
    .save()
    .then(() => {
     
    })
    .catch((err) => {
      console.log('Menstrual2ndCircleData: ', err);
      return res.status(500).json({ msg: err.message });
    });
}

