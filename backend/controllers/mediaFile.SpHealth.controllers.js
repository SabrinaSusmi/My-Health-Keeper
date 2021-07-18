const MultipleFile = require("../models/specializedHealthInfo.model");

const getallMediaFiles = async (req, res) => {
  try {
    const folderID = req.headers["folderid"];

    const files = await MultipleFile.findOne({ folderID });
    res.status(200).send(files.files);
  } catch (error) {
    res.send(error.message);
  }
};

const getFolderItems = async (req, res) => {
  try {
    const folderID = req.headers["folderid"];
    console.log("folderID: ", folderID);
    const files = await MultipleFile.findById(folderID, function (err, ans) {
      if (err) {
        console.log("getallMediaFiles>err: ", "no files found");
        res.send("no files found");
      }
      if (ans) {
        console.log("getallMediaFiles>ans: ", ans.files);
        res.status(200).send(ans.files);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getallMediaFiles,

  getFolderItems,
};
