const mongoose = require("mongoose");

const burnedChart = new mongoose.Schema({
  activity:{
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  
  calories: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("burned_chart_schema", burnedChart);
