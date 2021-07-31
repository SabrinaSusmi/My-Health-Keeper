import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, TextField, MenuItem, Select } from "@material-ui/core";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "../../../static/Styling/dietPlanGoal.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  height: "",
  weight: "",
  age: "",
  levelOfActivity: "",
  target: "",
  success: "",
  err:'',
};

export default function DietGoalSetter(props) {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const [basicInfo, setBasicInfo] = useState(initialState);
  const { height, weight, age, levelOfActivity, target,
    success,err } = basicInfo;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBasicInfo({ ...basicInfo, [name]: value, err: "", success: "" });
  };

const handleSubmit=async(e)=>{
  e.preventDefault();
let gender=user.gender
let userId=user._id

await axios.post(
  "http://localhost:5000/diet-plan/setup-target_info",
  {
    height: height,
    weight: weight,
    age: age,
    gender: gender,
    levelOfActivity: levelOfActivity,
    target: target,
    user: userId,
  },
  {
    headers: { Authorization: token },
  }
).then((res)=>{
  setBasicInfo({ ...basicInfo,  err: "", success: 'Your target is saved!!' });
  console.log('diet goal setter success ',res)

  setTimeout(function () {
    setBasicInfo(initialState);
    props.isVisible()
  }, 2000);
}).catch((err)=>{
  setBasicInfo({ ...basicInfo,  err: "Something went wrong!!", success: '' });
  console.log('diet goal setter ',err)
})
}



  return (
<div>
<div className="root">
       {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <Grid className="goal_grid" spacing={3} container>
        <Grid className="goal_grid_item" item xs={4}>
          <div
            data-toggle="tooltip"
            title="Height in inches"
            className="goal_font"
          >
            Height
          </div>
          <TextField
            fullWidth
            type="number"
            id="height"
            name="height"
            placeholder="Height in inches"
            onChange={handleChangeInput}
            value={height}
          />
        </Grid>
        <Grid className="goal_grid_item" item xs={4}>
          <div
            data-toggle="tooltip"
            title="Weight in kgs"
            className="goal_font"
          >
            Weight
          </div>
          <TextField
            fullWidth
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight in kgs"
            onChange={handleChangeInput}
            value={weight}
          />
        </Grid>
        <Grid className="goal_grid_item" item xs={4}>
          <div data-toggle="tooltip" title="Age in years" className="goal_font">
            Age
          </div>
          <TextField
            fullWidth
            type="number"
            id="age"
            name="age"
            placeholder="Age in years"
            onChange={handleChangeInput}
            value={age}
          />
        </Grid>
        <Grid className="goal_grid_item" item xs={7.5}>
          <div className="goal_font">
            Level of Activity: &emsp;{" "}
            <Select
              id="levelOfActivity"
              name="levelOfActivity"
              value={levelOfActivity}
              onChange={handleChangeInput}
              autoWidth
            >
              <MenuItem value={"sedentary"}>
                Sedentary (little or no exercise)
              </MenuItem>
              <MenuItem value={"lightly active"}>
                {" "}
                Lightly active (light exercise/sports 1-3 days/week)
              </MenuItem>
              <MenuItem value={"moderately active"}>
                Moderately active (moderate exercise/sports 3-5 days/week)
              </MenuItem>
              <MenuItem value={"very active"}>
                Very active (hard exercise/sports 6-7 days a week)
              </MenuItem>
              <MenuItem value={"extra active"}>
                Extra active (very hard exercise/sports and physical job or 2x
                training)
              </MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid className="goal_grid_item" item xs={4.5}>
          <div className="goal_font">
            Your Target: &emsp;{" "}
            <Select
              id="target"
              name="target"
              value={target}
              onChange={handleChangeInput}
              autoWidth
            >
              <MenuItem value={"gain"}>Weight Gain</MenuItem>
              <MenuItem value={"same"}>Maintain Current Weight</MenuItem>
              <MenuItem value={"loss"}>Weight Loss</MenuItem>
            </Select>
          </div>
        </Grid>
      </Grid>
      <div className="set_diet_goal_button">
        <Button onClick={handleSubmit} className="set_diet_goal_button_sub">SAVE</Button>
        &emsp;&emsp;
        <Button className="set_diet_goal_button_sub" onClick={props.isVisible}>
          Cancel
        </Button>
      </div>
    </div>

</div>
  );
}
