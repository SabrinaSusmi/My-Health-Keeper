const express = require("express");
const { upload } = require("../helpers/filehelper");
const router = express.Router();
const {
  saveSpecializedHealthInfo,
  getallSpecializedHealthInfo,
  getFolderDataForModal,
  updateSpecializedHealthInfo,
 deleteFolder,
} = require("../controllers/specializedHealthInfo.controllers");

const {getallMediaFiles, getFolderItems} =require('../controllers/mediaFile.SpHealth.controllers')
router.post(
  "/save-specialized-health-info",
  upload.array("files"),
  saveSpecializedHealthInfo
);
router.get("/get-specializedHealthInfo", getallSpecializedHealthInfo);
router.get("/getallMediaFiles", getallMediaFiles);
router.patch("/updateSpecializedHealthInfo/:folderId", updateSpecializedHealthInfo);
router.get("/getFolderItems", getFolderItems);
router.delete('/deleteFolder/:folderId',deleteFolder)
router.get('/getFolderDataForModal/:folderId',getFolderDataForModal)
module.exports = router;
