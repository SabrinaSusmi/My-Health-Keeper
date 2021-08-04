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

  const tryy = (predictedAns) => {
    try {
      let specialist = [];
    
      const jsonString = fs.readFileSync(
        "../backend/controllers/diseasePrediction/specialistList.json"
      );
      const diseaseSpecialistJsonFile = JSON.parse(jsonString);
      const diseaseList = Object.values(diseaseSpecialistJsonFile);
      for (let j = 0; j <3 ; j++) {
        let z = Object.keys(diseaseSpecialistJsonFile).toString().split(",");
        for (let i = 0; i < diseaseList.length; i++) {
          if (String(predictedAns[j].substring(0)) == z[i]) {
            console.log("hi ", diseaseList[i]);
            specialist.push(diseaseList[i]);
          }
        }
      
      }
      return specialist;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  pyProg.stdout.on("data", function (data) {
    const ans = data.toString().split("\r\n");
    const aa = [];
    aa.push(ans[0].toString());
    aa.push(ans[1].toString());
    aa.push(ans[2].toString());
    //  const q = aa[2].split("  ");

    const specialist = tryy(aa);
console.log('sss: ',specialist)
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
