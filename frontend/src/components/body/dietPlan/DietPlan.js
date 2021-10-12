import React, { useState, useEffect } from "react";
import { Button, Grid, Link, TextField } from "@material-ui/core";
import "../../../static/Styling/dietPlan.css";
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddFoodModal from "./addFoodModal";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
// import ArrowCircleDownIcon from '@material-ui/icons/ArrowCircleDown';
import FoodItemTable from "./FoodItemTable";
import "../../../static/Styling/dietFoodTable.css";
import "../../../static/Styling/diet.foodItemTable.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DietOverview from "./DietOverview";
import DietProgress from "./DietProgress";

export default function DietPlan() {
  const [showFoodModal, setShowFoodModal] = useState(false);
  const openFoodModal = () => setShowFoodModal(true);
  const token = useSelector((state) => state.token);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetVisibleProgress, setTargetVisibleProgress] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };

  const viewtargetInfoProgress = () => {
    setTargetVisibleProgress((prev) => !prev);
  };
  
  const history = useHistory();

  const viewProgress = () => {
    let path = "/diet-plans/progress";
    history.push(path);
  };

  return (
    <div
      class="bg_image"
      style={{
        backgroundImage: "url(/img/diet.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          maxWidth: "100%",
          padding: 0,
          marginRight: 0,
        }}
      >
        <div style={{ backgroundColor: "black", color: "black" }}>
          {ShowHeader(COLORS.dietBackground)}
        </div>
        <pre></pre>
        <pre></pre> <pre></pre> <pre></pre> <pre></pre>
        <Row className="body_feature_row">
          
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="food_header_content">
              <p>Welcome to the route for HEALTHY life!</p>
            </div>
            <div className="food_overview">
              <div className="food_overview_header">
                <h3>Overview</h3>
              </div>
              <div className="food_overview_box">
                <DietOverview />
              </div>
            </div>
            <div className="progress_history_section">
              <div className="progress_history_button_div">
                <div className="progress_history_section_buttons" onClick={viewtargetInfoProgress}>Progress</div>
                <div className="progress_history_section_buttons" onClick={viewtargetInfo}>History</div>
                <div className="progress_history_section_buttons" onClick={viewtargetInfo}>Set Your Goal</div>
              </div>
              <div className="progress_history_info_div">
                {targetVisibleProgress ? (<div> 
                    <DietProgress isVisible={() => viewtargetInfoProgress()} /></div>
                  ) : ("")}

                {targetVisible ? (<div>
                  <DietGoalSetter isVisible={() => viewtargetInfo()} /></div>
                ) : ("")}
              </div>
            </div>
            <div>
              <div className="diet_buttons">
               
                <Button className="diet_buttons_sub" onClick={viewProgress}>
                  {" "}
                  {""} Progress
                </Button>
                <Button className="diet_buttons_sub"> {""} History</Button>
              </div>
              <div className="strings">
                <h3>
                  <i>
                    <b>Welcome to the route for <span style={{color:'#fcdf00', textShadow: '2px 2px #373950'}}> HEALTHY</span> life!</b>
                  </i>
                </h3>
                <p>
                  Start tracking your calories intake according to your
                  targetted goal!
                </p>
              </div>
              
            </div>
            <Grid container>
              <Grid item xs={4} >
               
                <div className='add_food_div'>
                <h4>Add Food Items </h4>
                  <AddFoodModal/>
                {/* <AddFoodModal
                  showFoodModal={showFoodModal}
                  setShowFoodModal={setShowFoodModal}
                />{" "} */}
                {/* <div className="add_food">
                  <Button className="add_food_btn" onClick={openFoodModal}>
                    <IconButton aria-label="add">
                      <AddCircleOutlineRoundedIcon />
                    </IconButton>
                    {""} Add Food Item
                  </Button>
                </div> */}
                </div>
                <div className='add_food_div'> 
                
                {targetVisible ? (<div><h4>Set Your GOAL<IconButton className="diet_buttons_sub" onClick={viewtargetInfo}>
                <i class="fas fa-arrow-down"></i>
                </IconButton> </h4> 
                <DietGoalSetter isVisible={() => viewtargetInfo()} /></div>
              ) : (<div ><h4>Set Your GOAL
                <IconButton className="diet_buttons_sub" onClick={viewtargetInfo}>
                <i class="fas fa-arrow-up"></i>
                </IconButton></h4> </div>
              )}
                </div>
              </Grid>{" "}
              <Grid item xs={7} 
              className='add_food_div'
              style={{ backgroundColor: "#f4c805" }}
              >
                {" "}
                <FoodItemTable />
                
              </Grid>
            </Grid>
          </Col>
          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            <pre></pre>
            {ShowFeatureButtons()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
