const { spawn } = require("child_process");

const predictDisease = async(req, res) => {
  
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
  let i=0
  pyProg.stdout.on("data", function (data) {
 
    const ans=data.toString().split(',\r\n')
    console.log("jb",i++, ans[0]); 
    const aa=[]
    aa.push(ans[1].toString())
    aa.push(ans[3].toString())
    res.send({a:aa[0],b:aa[1]}) 
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
