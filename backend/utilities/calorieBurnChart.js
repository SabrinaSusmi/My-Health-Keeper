const fs = require("fs");
const fastcsv = require("fast-csv");
const burnedChart = require("../models/BurnedChart.models");

const saveBurnedCaloriesToDB = () => {
  let stream = fs.createReadStream("../backend/utilities/BurnedChart.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push({ 
        activity: data[0],
        time: data[1],
        calories: data[2],
      });
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // console.log(csvData);
      for (let i = 0; i < csvData.length; i++) {
        // console.log(csvData[i]["name"]);
        burnedChart
          .findOne({ activity: csvData[i]["activity"] })
          .then((ans) => {
            if (!ans) {
              burnedChart.create(csvData[i], (err, res) => {
                if (err) throw err;
              });
            }
          });
      }
    });

  stream.pipe(csvStream);
};

module.exports = saveBurnedCaloriesToDB;
