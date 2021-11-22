import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button, Link } from "@material-ui/core";
import HistoryModal from "./HistoryModal";

export default function UserMenstrualCircleInfo() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [numberOfDaysSinceLastCycle, setNumberOfDaysSinceLastCycle] =
    useState("");
  const [lastCycleLength, setCycleLength] = useState("");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const openHistoryModal = () => setShowHistoryModal(true);

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
        <p>
          <b>{numberOfDaysSinceLastCycle}</b> days since last period.
        </p>
      </div>
      <div>
      <Button
          // to="/display-menstrual_tips"
          // component={NavLink}
          onClick={openHistoryModal}
          className="info_item"
          style={{
            cursor: "pointer",
            color: "black",
            borderRadius: "50%",
            fontSize: "10px",
            border: "rgb(250, 131, 131) 2px solid",
          }}
        >
          <p style={{ fontSize: "12px", fontStyle: "none" }}>
            <pre></pre>The last cycle was <b> {lastCycleLength} </b>days long 
          </p>
        </Button>
        <HistoryModal
                    showWeightModal={showHistoryModal}
                    setShowWeightModal={setShowHistoryModal}
                  />
      </div>
      <div style={{paddingLeft:'2.5%'}}>
        <Button
          to="/display-menstrual_tips"
          component={NavLink}
          className="info_item"
          style={{
            cursor: "pointer",
            color: "black",
            borderRadius: "50%",
            fontSize: "10px",
            border: "rgb(250, 131, 131) 2px solid",
          }}
        >
          <p style={{ fontSize: "12px", fontStyle: "none" }}>
            <pre></pre>Want to know about your period?
          </p>
        </Button>
      </div>
    </div>
  );
}
