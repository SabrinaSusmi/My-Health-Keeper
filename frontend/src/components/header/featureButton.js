import React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import HealingIcon from "@material-ui/icons/Healing";
import { Button, Link, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import featureButton from "../../static/Styling/featureButton.css";

export const showFeatureButtons = () => {
  return (
    <div className='div'>
      <Grid item className="item">
        <Link
          className="sidebar-icon-link"
          to="/general-health-dashboard"
          component={NavLink}
        >
          {" "}
          <Button
            className="genHealthButton"
            data-toggle="tooltip"
            title="General Health Information"
          >
            <FitnessCenterIcon />
          </Button>
        </Link>
      </Grid>

      <Grid item className="item">
        <Link
          className="sidebar-icon-link"
          to="/diet-plans"
          component={NavLink}
        >
          {" "}
          <Button
            className="dietButton"
            data-toggle="tooltip"
            title="Diet Plan"
          >
            <FastfoodIcon />
          </Button>
        </Link>
      </Grid>

      <Grid item className="item">
        <Link
          className="sidebar-icon-link"
          to="/specialized-health-information"
          component={NavLink}
        >
          {" "}
          <Button
            className="spHealthButton"
            data-toggle="tooltip"
            title="Specialized Health Information"
          >
            <LocalHospitalIcon />
          </Button>
        </Link>
      </Grid>

      <Grid item className="item">
        <Link className="sidebar-icon-link" to="/" component={NavLink}>
          <Button
            className="reportButton"
            data-toggle="tooltip"
            title="Reports"
          >
            {" "}
            <AssessmentIcon />
          </Button>{" "}
        </Link>
      </Grid>

      <Grid item className="item">
        <Link
          className="sidebar-icon-link"
          to="/disease-prediction"
          component={NavLink}
        >
          {" "}
          <Button
            className="diseasePredictButton"
            data-toggle="tooltip"
            title="Disease Prediction"
          >
            <HealingIcon />
          </Button>
        </Link>
      </Grid>

      <Grid item className="item">
        <Link
          className="sidebar-icon-link"
          to="/display-medicine-reminderList"
          component={NavLink}
        >
          <Button
            className="medicineReminderButton"
            data-toggle="tooltip"
            title="Medicine Reminder"
          >
            <AddAlertIcon />
          </Button>
        </Link>
      </Grid>
    </div>
  );
};