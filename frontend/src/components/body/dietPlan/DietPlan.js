import React, { useState, useEffect } from "react";
import { Button, Link, TextField } from "@material-ui/core";
import "../../../static/Styling/dietPlan.css";
import { NavLink } from "react-router-dom";
import DietGoalSetter from "./DietGoalSetter";
import { useSelector } from "react-redux";
import axios from "axios";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import FoodItemTable from "./FoodItemTable";

export default function DietPlan() {
  const token = useSelector((state) => state.token);
  const [targetVisible, setTargetVisible] = useState(false);
  const viewtargetInfo = () => {
    setTargetVisible((prev) => !prev);
  };
  const history = useHistory();

  const viewProgress = () => {
    let path = "/diet-plans/progress";
    history.push(path);
  };

  return (
    <div>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          maxWidth: 1900,
          padding: 0,
          marginRight: 0,
        }}
      >
        <div style={{ backgroundColor: "black", color: "black" }}>
          {ShowHeader(COLORS.dietBackground)}
        </div>
        <pre></pre>
        <pre></pre> <pre></pre> <pre></pre> <pre></pre>
        <pre></pre>
        <Row className="body_feature_row">
          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            {ShowFeatureButtons()}
          </Col>
          <Col
            style={{
              marginLeft: 150,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <div className="diet_buttons">
                <Button className="diet_buttons_sub" onClick={viewtargetInfo}>
                  {""} Set Your Goal
                </Button>
                <Button className="diet_buttons_sub" onClick={viewProgress}>
                  {" "}
                  {""} Progress
                </Button>
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
                <p>
                  Choose your date and start tracking your calories intake
                  according to your targetted goal!🎯
                </p>
              </div>
              <hr></hr>
              {/* <div className="diet_date">
                <div>
                  <Button>
                    <i class="far fa-calendar-alt" />
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
              </div> */}
            </div>

            <FoodItemTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
