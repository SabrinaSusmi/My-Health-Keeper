const express = require("express");
const router = express.Router();
const cycleTrackerCtrl = require("../controllers/menstrualCycle.controllers/cycleTrackerControllers");
const notesCycleTrackerControllers=require('../controllers/menstrualCycle.controllers/notes.cycleTracker.controllers')
const auth = require("../middleware/auth");

router.post("/setup-initial-data", auth, cycleTrackerCtrl.setupInitialData);
router.post("/cycleTracker-notes", auth, notesCycleTrackerControllers.createNotes);
router.get("/cycleTracker-display-notes", auth, notesCycleTrackerControllers.displayNotes);
router.patch("/update-menstrual-data",cycleTrackerCtrl.updateInitialData)
router.get("/is-initial-data-available",cycleTrackerCtrl.isInitialDataAvailable)

module.exports = router;
