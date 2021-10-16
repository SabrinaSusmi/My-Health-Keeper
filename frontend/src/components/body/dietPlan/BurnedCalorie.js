import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Select, IconButton } from "@material-ui/core";
import "../../../static/Styling/dietProgress.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";

import { Container, Row, Col } from "react-grid-system";

import { COLORS } from "../../themeColors";

const initialState = {
  selectedMonth: "",
};

export default function BurnedCalories() {
    const [burnCal, setBurnCal] = useState("");

  // const history = useHistory();
  const token = useSelector((state) => state.token);
  const saveBurnCal = async (e) => {
    e.preventDefault();
    
  };
  

  useEffect(() => {
    // consumedCaloriesChart();
  }, []);
  return (
    <div>
        <h3>Burnt some calories today?</h3>
Track the amount of calories you've burn everyday
<br></br>
              <TextField
                type="text"
                id="calorieBurn"
                name="calorieBurn"
                label="Kcal"
                value={burnCal}
                onChange={(e) => {
                  setBurnCal(e.target.value);
                }}
              ></TextField>
              <Button
                type="submit"
                // className="add_btn"
                variant="contained"
                onClick={saveBurnCal}
                color="white"
              >
                <font> save</font>
              </Button>
    </div>
  );
}
