import React, { useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import "../../../static/Styling/dietPlan.css";
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import axios from "axios";

export default function DietPlan() {
  const token = useSelector((state) => state.token);
  const [targetVisible, setTargetVisible] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };
  return (
    <div>
      <div className="diet_buttons">
        <Button className="diet_buttons_sub" onClick={viewtargetInfo}>
          {""} Set Your Goal
        </Button>
      </div>
      {targetVisible ? <DietGoalSetter
       isVisible={() => viewtargetInfo()}  /> : ""}
    </div>
  );
}
