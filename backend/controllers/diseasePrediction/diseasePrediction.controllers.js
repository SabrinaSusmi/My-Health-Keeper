const { spawn } = require("child_process");

const predictDisease = (req, res) => {
  const { s1, s2, s3, s4, s5 } = req.body;
  console.log(s1, " ", s2, " ", s3, " ", s4, " ", s5);
  const pyProg = spawn("python", [
    "../backend/ML/diseasePrediction.py",
    s1,
    s2,
    s3,
    s4,
    s5,
  ]);
  pyProg.stdout.on("data", function (data) {
    console.log("jb", data.toString());
  });
  pyProg.stdin.on;
  pyProg.stderr.on("data", function (data) {
    console.error(data.toString());
  });

  pyProg.on("close", function (code) {
    console.log(code);
  });
};
module.exports = predictDisease;
