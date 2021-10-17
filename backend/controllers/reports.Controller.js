const { spawn } = require("child_process");
const ReportModel = require("../models/reports.model");
const reports = async (req, res) => {
  const { s1, s2, s3, s4, s5 } = req.headers;
  // console.log(s1)
  const image = req.file.path.split("\\");
  console.log(image[1]);
  const reportsave = new ReportModel({
    fileName: req.file.originalname,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
  });
  reportsave
    .save()
    .then(() => {
     await ReportModel.find({filePath: req.file.path}).then((ans)=>{res.send({image:ans})}).catch((e)=>{console.log(e)})
    })
    .catch((er) => {
      console.log(er);
    });
  const imgPath = "../backend/ML/" + image[1];
  console.log("imgPath ", imgPath);
  const pyProg = spawn("python", ["../backend/ML/reports.py", imgPath]);

  pyProg.stdout.on("data", function (data) {
    const ans = data.toString();
    console.log(ans);
  });
  pyProg.on("close", function (code) {
    console.log(code);
  });
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
module.exports = { reports };