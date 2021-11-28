const mongoose = require("mongoose");

const Menstrual2ndCircleData = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  duration: {
    type: String,
  },
  cycleLength: {
    type: Number,
  },
  
});

module.exports = mongoose.model("Menstrual_2nd_Circle_Data_Schema", Menstrual2ndCircleData);
