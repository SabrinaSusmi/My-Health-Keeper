const medConfirmation = require("../../models/medicineConfirmation.model");
const UserModel = require("../../models/userModel");
const sendEmail = require("../sendMail.Controllers");
const PaymentModel = require("../../models/Payment.models");
const sendSMS = require("../SMS.controllers");
let medicineList = [];
let userMedicineReminderObject;

setInterval(() => {
  medConfirmation.find({}, (err, reminder) => {
    if (err) {
      console.log("medConfirmation notification: ", err);
    }
    if (reminder) {
      for (i = 0; i < reminder.length; i++) {
        if (!reminder[i].isReminded) {
          var dbMedtime = reminder[i].medtime;

          var dbMedDate = reminder[i].meddate;
          const convertDateToDate = new Date(dbMedDate);
          const convertDateToString =
            convertDateToDate.toISOString().slice(0, 11) + dbMedtime + ":00.00";
          const time1 = new Date(convertDateToString);

          if (time1.getTime() - Date.now() < 0) {
            console.log(time1.getTime() - Date.now());

            medConfirmation.findByIdAndUpdate(
              reminder[i]._id,
              {
                isReminded: true,
              },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }
                medicineList.push(remind.medname);

                // console.log("new med set reminder: ", medicines, 'empty object ',remindObject);
                userMedicineReminderObject = remind;
              }
            );
          }
        }
      }
    }
    // console.log("meds ", medicineList.length);
    if (medicineList.length > 0 ) {
      console.log("new med : ", medicineList, 'filled object ',userMedicineReminderObject);
      setReminder();
      // setTimeout(function () {
      //   //setItem(InitialState);
      // }, 2000);
    }
  });
}, 10000);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const setReminder = async () => {
  console.log("setReminder->medicineList  ", medicineList);
  console.log("setReminder->userMedicineReminderObject ", userMedicineReminderObject);
  UserModel.find({ email: userMedicineReminderObject.userEmail }).then((res1) => {
    const userPhone = res1[0].phone;
    let username = res1[0].name;
    let msg = `Medicine REMINDER for ${username}!!\nYou should take ${medicineList} at ${userMedicineReminderObject.medtime}!!`;
    PaymentModel.find({
      user: userMedicineReminderObject.user,
      paymentDone: true,
    }).then((res2) => {
      sendEmail(remindObject.userEmail, "", msg, "", "");
      // console.log("mff ", msg);
      if (res2.length > 0) {
        sendSMS(userPhone, msg);
      } else {
        console.log("pay first");
      }
      counts = 1;
    });
  });
  await delay(2000);
  medicineList.splice(0, medicineList.length);
  // console.log("pay hbfi ", medicineList);
  for (var member in userMedicineReminderObject) delete userMedicineReminderObject[member];
};
const getDoses = async (req, res) => {
  let user = req.user.id;
  const date1 = new Date();
  console.log(new Date(date1.toISOString().slice(0, 10)));

  medConfirmation
    .find({
      user: user,
      meddate: "/^" + new Date(date1.toISOString().slice(0, 10)) + "/",
      isTaken: false,
    })
    .sort({
      medtime: 1,
    })
    .then((result) => {
      res.send(result);
    });
};

const getMissedDoses = async (req, res) => {
  let user = req.user.id;
  const date1 = new Date();
  console.log(new Date(date1.toISOString().slice(0, 10)));

  medConfirmation.find(
    {
      user: user,
      doseId: req.params.id,
      meddate: { $lt: new Date(date1.toISOString().slice(0, 10)) },
      isTaken: false,
    },
    (err, doseList) => {
      if (err) {
        console.log(user);
        console.log("Test :" + err);
      }
      if (doseList) {
        res.send(doseList);
        console.log(doseList);
        console.log("done");
      }
    }
  );
};

const doseConfirmUpdate = async (req, res) => {
  let user = req.headers["userid"];
  medConfirmation.find({ user }, (err, doseList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (doseList) {
      var query = { _id: req.params.id };
      var newvalue = { $set: { isTaken: true } };
      medConfirmation
        .updateOne(query, newvalue)
        .then(() => res.json("Confirmed."))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
};

module.exports = { getDoses, doseConfirmUpdate, getMissedDoses };
