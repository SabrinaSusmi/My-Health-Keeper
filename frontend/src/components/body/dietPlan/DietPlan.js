import React, { useState, useEffect } from "react";
import "../../../static/Styling/dietPlan.css";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import AddFoodModal from "./addFoodModal";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
import { Container, Row, Col } from "react-grid-system";
import { COLORS } from "../../themeColors";
import "react-datepicker/dist/react-datepicker.css";
import FoodItemTable from "./FoodItemTable";
import DietOverview from "./DietOverview";
import DietProgress from "./DietProgress";

export default function DietPlan() {
  const token = useSelector((state) => state.token);
  const [targetVisible, setTargetVisible] = useState(false);
  const [targetVisibleProgress, setTargetVisibleProgress] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };

  const viewtargetInfoProgress = () => {
    setTargetVisibleProgress((prev) => !prev);
  };

  useEffect(async () => {

  }, []);

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
                <div className="progress_history_section_buttons" onClick={viewtargetInfo}>Set Your Goal</div>
                <div className="progress_history_section_buttons" onClick={viewtargetInfoProgress}>Progress</div>
                <div className="progress_history_section_buttons" onClick={viewtargetInfo}>History</div>
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

            <div className="food_table_div">
              <div className="overlay"></div>
              <div className="food_table_body">
                <div className="food_table_header">
                  <h3>Add Your Foods Here</h3>
                </div>
                <div className="food_table_box">
                  <div className="add_food">
                    <h4>Add Food Items </h4>
                    <AddFoodModal/>
                    </div>
                  <div className="food_table_item">
                    <FoodItemTable />
                  </div>
                </div>
              </div>
            </div>

            <div className="exercise_section">
              <h3>Burnt some calories today?</h3>
            </div>
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
