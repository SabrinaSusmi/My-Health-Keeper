const { spawn } = require("child_process");
const fs = require("fs");

const predictDisease = async (req, res) => {
  const { s1, s2, s3, s4, s5 } = req.headers;
  console.log(s1, " ", s2, " ", s3, " ", s4, " ", s5);
  const pyProg = spawn("python", [
    "../backend/ML/diseasePrediction.py",
    s1,
    s2,
    s3,
    s4,
    s5,
  ]);

  const tryy = (sss) => {
    try {
    
      const jsonString = fs.readFileSync(
        "../backend/controllers/diseasePrediction/try.json"
      );
      const diseaseSpecialistJsonFile = JSON.parse(jsonString);
      const diseaseList = Object.values(diseaseSpecialistJsonFile);
      for (let i = 0; i < diseaseList.length; i++) {
        let z = Object.keys(diseaseSpecialistJsonFile).toString().split(",");
        if (String(sss.substring(0)) == z[i]) {
          console.log("hi ", diseaseList[i]);
          return diseaseList[i];
        }
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
  pyProg.stdout.on("data", function (data) {
    const ans = data.toString().split("\r\n");
      const aa = [];
    aa.push(ans[1].toString());
    aa.push(ans[3].toString());
    aa.push(ans[0].toString());
    //  const q = aa[2].split("  ");

    const specialist = tryy(aa[2]);

    res.send({
      diseaseName: aa,
      diseasePercenatge: aa[1],
      diseaseSpecialist: specialist,
    });
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
