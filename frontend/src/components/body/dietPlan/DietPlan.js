import React, { useState, useEffect } from "react";
import { Button, Link,TextField } from "@material-ui/core";
import "../../../static/Styling/dietPlan.css";
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

import FoodItemTable from "./FoodItemTable";

export default function DietPlan() {
 
  const token = useSelector((state) => state.token);
  const [targetVisible, setTargetVisible] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };
  return (
    <div>
      <div>
        <div className="diet_buttons">
          <Button className="diet_buttons_sub" onClick={viewtargetInfo}>
            {""} Set Your Goal
          </Button>
          <Button className="diet_buttons_sub"> {""} Progress</Button>
          <Button className="diet_buttons_sub"> {""} History</Button>
        </div>
        {targetVisible ? (
          <DietGoalSetter isVisible={() => viewtargetInfo()} />
        ) : (
          ""
        )}
      </div>
      <div className="diet_body">
      <div className="strings">
       <h4>🙋🏻‍♀️Welcome to the route for healthy life!</h4>
       <p>Choose your date and start tracking your calories intake according to your targetted goal!🎯</p>
       </div>
       <hr></hr>
         <div className="diet_date">
                    <div>
                      <Button>
                      <i class="far fa-calendar-alt"/>
                      </Button>
                  
                       <TextField
                      type="date"
                      required
                      id="dietDate"
                      name="dietDate"
                      InputLabelProps={{
                        shrink: false,
                      }}
                   />
                  
       </div>
     </div>
     </div>
  
  <FoodItemTable/>
    </div>
  );
}
