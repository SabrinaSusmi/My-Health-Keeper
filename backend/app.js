const express = require("express");
const cors = require("cors");
const router = require("./routers/userRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const medReminderRouter = require("./routers/medReminder.route");
const cycleTracker = require("./routers/cycleTracker.routers");
const medDoses = require("./routers/medDose.route");
const specializedHealthInformation = require('./routers/specializedHealthInformation.routers');
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', specializedHealthInformation);
app.use(medReminderRouter);
app.use(medDoses);

app.use("/user", cycleTracker);
app.use("/user", router);

module.exports = app;
