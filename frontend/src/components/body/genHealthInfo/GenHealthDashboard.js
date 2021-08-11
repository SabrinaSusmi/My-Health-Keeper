import React from "react";
import { useState, useEffect } from "react";
import "../../../static/Styling/medicineReminder.css";
import "../../../static/Styling/healthInfo.css";
import { Button, IconButton, Link } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";

function GenHealthDashboard() {
    
  return (
    <div>
      {" "}
      &nbsp;
      <div className="reminder_buttons">
        <Link
          href="/general-health-information"
          className="reminder_buttons_sub"
        >
          {""} Add Today's Information
        </Link>
      </div>

      <div class="container">
  <div>
      </div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
    </div>
  );
}

export default GenHealthDashboard;