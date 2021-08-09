const Cycle = require("../../models/periodTracker.model");
const sendMail = require("../sendMail.Controllers");
const sendSMS = require("../SMS.controllers");
const UserModel = require("../../models/userModel");

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
      let user = req.headers["userid"];

      const { startDate, endDate } = req.body;
      await Cycle.findOneAndUpdate(
        { user: user },
        {
          startDate: startDate,
          endDate: endDate,
          isReminded: false,
        }
      ).then(() => {
        console.log("updateInitialData ", startDate);
        return res.json({ msg: "Update Success!" });
      });
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },
  isInitialDataAvailable: async (req, res) => {
    try {
      let user = req.headers["userid"];

      const check = await Cycle.findOne({
        user,
      });

      if (check) {
        console.log(check.startDate);
        return res.json(check);
      }
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    let user = req.headers["userid"];
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
