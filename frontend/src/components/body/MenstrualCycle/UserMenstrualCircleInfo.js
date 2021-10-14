import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "@material-ui/core";
export default function UserMenstrualCircleInfo() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [numberOfDaysSinceLastCycle, setNumberOfDaysSinceLastCycle] =
    useState("");
  const [lastCycleLength, setCycleLength] = useState("");

  const getNumberOfDaysSinceLastCycle = async () => {
    axios
      .get(`http://localhost:5000/user/get_last_period_days_number`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setNumberOfDaysSinceLastCycle(response.data.CycleLength);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCycleLength = async () => {
    axios
      .get(`http://localhost:5000/user/last_cycle_length`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data.cycleLength);
        setCycleLength(response.data.cycleLength);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNumberOfDaysSinceLastCycle();
    getCycleLength();
  }, []);
  return (
    <div className="info_section">
      <div className="info_item">
        <p><b>{numberOfDaysSinceLastCycle}</b> days since last period.</p>
      </div>
      <div className="info_item">
        <p>The last cycle was <b> {lastCycleLength} </b>days long.</p>
      </div>
      <Link
        className="tips_style"
        style={{color:'black'}}
        to="/display-menstrual_tips"
        component={NavLink}
      >
        <div
          className="info_item"
          style={{ cursor: "pointer" }}
        >
          <p>Want to know about your period?</p>
        </div>
      </Link>
     
    </div>
  );
}
