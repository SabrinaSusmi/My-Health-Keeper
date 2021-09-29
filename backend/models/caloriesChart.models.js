const mongoose = require("mongoose");

const calorieChart = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("calorie_chart", calorieChart);
