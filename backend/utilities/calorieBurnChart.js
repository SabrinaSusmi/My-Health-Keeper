const fs = require("fs");
const fastcsv = require("fast-csv");
const burnedChart = require("../models/caloriesChart.models");

const saveCalorieToDB = () => {
  let stream = fs.createReadStream("../backend/utilities/BurnedChart.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push({
        category: data[0], 
        name: data[1],
        qty: 1,
        calories: data[2],
      });
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // console.log(csvData);
      for (let i = 0; i < csvData.length; i++) {
        // console.log(csvData[i]["name"]);
        burnedChart.findOne({ name: csvData[i]["name"] }).then((ans) => {
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

module.exports = saveCalorieToDB;
