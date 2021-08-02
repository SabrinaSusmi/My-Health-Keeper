import React, { useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import "../../../static/Styling/dietPlan.css";
import Table from 'react-bootstrap/Table'
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
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
