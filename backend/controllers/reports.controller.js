const { spawn } = require("child_process");

const reports = async (req, res) => {
  const { s1, s2, s3, s4, s5 } = req.headers;
  // console.log(s1)
  const pyProg = spawn("python", ["../backend/ML/reports.py"]);

  pyProg.stdout.on("data", function (data) {
    const ans = data.toString();
    console.log(ans);
  });   
  pyProg.on("close", function (code) {
    console.log(code);
  });
};

module.exports = { reports };
