const express = require("express");
const cors = require("cors");
const authRoutes = require("./routers/authRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const medReminderRoutes = require("./routers/medReminder.route");
const cycleTracker = require("./routers/cycleTracker.routers");
const medDosesRoutes = require("./routers/medDose.route");
const paymentRoutes = require("./routers/payment.routers");
const dietPlanRoutes=require('./routers/dietPlan.routers')
const spHealthInformationRoutes = require("./routers/specializedHealthInformation.routers");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", spHealthInformationRoutes);
app.use(medReminderRoutes);
app.use(medDosesRoutes);
app.use('/diet-plan',dietPlanRoutes)
app.use("/user", cycleTracker);
app.use("/user", authRoutes);

app.use("/payment", paymentRoutes);


module.exports = app;
