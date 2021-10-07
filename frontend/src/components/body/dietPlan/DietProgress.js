import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Select } from "@material-ui/core";
import "../../../static/Styling/dietProgress.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DatePicker from "react-datepicker";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";

const initialState = {
  selectedMonth: "",
};

export default function DietProgress() {
  // const history = useHistory();
  const token = useSelector((state) => state.token);
  const currentMonth = new Date().getMonth();
  const [selectedDate, setSelectedDate] = useState("");
  const [consumedCaloriesData, setconsumedCaloriesData] = useState({});
 

  const consumedCaloriesChart = () => {
    let weight_array = [];
    let weight_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Weight", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        res.data.infoData.forEach((element) => {
          weight_array.push(element);
        });
        res.data.dates.forEach((element) => {
          weight_date_array.push(element);
        });
        console.log(weight_date_array);

        setconsumedCaloriesData({
          labels: weight_date_array,
          datasets: [
            {
              data: weight_array,
              label: "Weight (Last 7 days)",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    consumedCaloriesChart();
    
  }, []);
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
              <Container className='progress_container'>
                <Row>
                  <Col className="diet_progress_desc" style={{width:'35%',padding:'10px'}} sm={4} >
                   
                    <div className="month_progress_div">
                      <Select
                        // className={classes.formControl}
                        type="text"
                        id="selectedMonth"
                        name="selectedMonth"
                        className="month_progress_select"
                        defaultValue={currentMonth}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        padding="10px"
                        label="selectedMonth"
                      >
                        <option value={"0"}>January</option>
                        <option value={"1"}>February</option>
                        <option value={"2"}>March</option>
                        <option value={"3"}>April</option>
                        <option value={"4"}>May</option>
                        <option value={"5"}>June</option>
                        <option value={"6"}>July</option>
                        <option value={"7"}>August</option>
                        <option value={"8"}>September</option>
                        <option value={"9"}>October</option>
                        <option value={"10"}>November</option>
                        <option value={"11"}>December</option>
                      </Select>
                      {console.log(selectedDate)}
                    </div>
                    <div className="avg_consumed_cal_progress_div">
                      <span>
                        {" "}
                        Last month avg. <br></br>
               <h2>         <b>{selectedDate} </b></h2>
                        kiloCalories were consumed
                      </span>
                    </div>
                    <div className="suggestion_progress_div">
                      <span>
                        You should have <br></br> lost around{" "}
                        <h4>
                          <b>3.5 kgs</b>{" "}
                        </h4>{" "}
                        in last month
                      </span>
                    </div>
                  </Col>
                  <Col className="diet_progress_graph" style={{width:'65%',padding:'10px'}} >


                  <h4>Weight for Last 7 days</h4>
            <Line
              data={consumedCaloriesData}
              options={{
                responsive: true,
                title: { text: "Sugar Graph", display: true },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true,
                      },
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              }}
            />


                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
