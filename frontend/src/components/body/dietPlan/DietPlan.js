import React, { useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "../../../static/Styling/dietPlan.css";
import Table from 'react-bootstrap/Table'
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import CalendarIcon from "react-calendar-icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

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
      {targetVisible ? <DietGoalSetter
       isVisible={() => viewtargetInfo()}  /> : ""}
       </div>
       <div className="diet_body">
         <div className="strings">
       <h4>🙋🏻‍♀️Welcome to the route for healthy life!</h4>
       <p>Choose your date and start tracking your calories intake according to your targetted goal!🎯</p>
       </div>
       <hr></hr>
         <div className="diet_date">
                    <div>
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
         <div className="add_food">
         <Button className="add_food_btn"> 
         <IconButton aria-label="add" >
             <AddCircleOutlineRoundedIcon />
        </IconButton>
             {""} Add Food Item</Button>
         </div>
         <div className="food_table">
       <Table  hover size="md">
  <thead>
    <tr>
      <th>#</th>
      <th>Food Name</th>
      <th>Quantity</th>
      <th>Meal Description</th>
      <th>Calories Consumed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Rice</td>
      <td>2 cups</td>
      <td>Lunch</td>
      <td>173</td>
    </tr>
  </tbody>
</Table>
</div>
       </div>
    </div>
  );
}
