const mongoose = require("mongoose");

const consumedCalories = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  foodItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "calorie_charts",
  },
  quantity: {
    type: number,
    required: true,
  },
  consumedCalories: {
    type: Number,
  },

  date: {
    type: Date,
  },
});

module.exports = mongoose.model("consumed_calories_schema", consumedCalories);
