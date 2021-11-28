import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../../static/Styling/medicineReminder.css";
import "../../../static/Styling/healthInfo.css";
import { Button, IconButton, Link, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";

import { COLORS } from "../../themeColors";
import WeightInfo from "./WeightInfo";
import BpInfo from "./BpInfo";
import PulseInfo from "./PulseInfo";
import SugarInfo from "./SugarInfo";

function GenHealthDashboard() {
  const token = useSelector((state) => state.token);
  const [weightChartData, setWeightChartData] = useState({});
  const [bpChartData, setBpChartData] = useState({});
  const [bpDiasChartData, setBpDiasChartData] = useState({});
  const [pulseChartData, setPulseChartData] = useState({});
  const [sugarChartData, setSugarChartData] = useState({});
  const [showWeightInfo, setShowWeightInfo] = useState(false);
  const [showBpInfo, setShowBpInfo] = useState(false);
  const [showPulseInfo, setShowPulseInfo] = useState(false);
  const [showSugarInfo, setShowSugarInfo] = useState(false);
  const viewWeightInfo = () => {
    setShowWeightInfo((prev) => !prev);
  };
  const viewBpInfo = () => {
    setShowBpInfo((prev) => !prev);
  };
  const viewPulseInfo = () => {
    setShowPulseInfo((prev) => !prev);
  };
  const viewSugarInfo = () => {
    setShowSugarInfo((prev) => !prev);
  };

  const weightChart = () => {
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

        setWeightChartData({
          labels: weight_date_array,
          datasets: [
            {
              data: weight_array,
              label: "Weight (Last 7 days)",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#f7ae63",
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

  const bpChart = () => {
    let bp_sys_array = [];
    let bp_sys_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Bp_sys", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        res.data.infoData.forEach((element) => {
          console.log("cbdjbc ", element);
          bp_sys_array.push(element);
        });
        res.data.dates.forEach((element) => {
          bp_sys_date_array.push(element);
        });
        console.log(bp_sys_date_array);

        let bp_dias_array = [];
        let bp_dias_date_array = [];
        axios
          .get("http://localhost:5000/getChart/Bp_dias", {
            headers: { Authorization: token },
          }) //get info and input date from db
          .then((res) => {
            res.data.infoData.forEach((element) => {
              console.log("cbdjbc ", element);
              bp_dias_array.push(element);
            });
            res.data.dates.forEach((element) => {
              bp_dias_date_array.push(element);
            });
            console.log(bp_dias_date_array);

            setBpChartData({
              labels: bp_dias_date_array,
              datasets: [
                {
                  data: bp_dias_array,
                  label: "Diastolic Blood Pressure (Last 7 days)",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: "#fd8100",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  pointRadius: 4,
                },
                {
                  data: bp_sys_array,
                  label: "Systolic Blood Pressure (Last 7 days)",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: "#134f5c",
                  borderColor: "rgba(0,0,0,1)",
                  borderWidth: 2,
                  pointRadius: 4,
                },
              ],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pulseChart = () => {
    let pulse_array = [];
    let pulse_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Pulse", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        res.data.infoData.forEach((element) => {
          pulse_array.push(element);
        });
        res.data.dates.forEach((element) => {
          pulse_date_array.push(element);
        });
        console.log(pulse_date_array);

        setPulseChartData({
          labels: pulse_date_array,
          datasets: [
            {
              data: pulse_array,
              label: "Pulse (Last 7 days)",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#f7ae63",
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

  const sugarChart = () => {
    let sugar_array = [];
    let sugar_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Sugar", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        res.data.infoData.forEach((element) => {
          sugar_array.push(element);
        });
        res.data.dates.forEach((element) => {
          sugar_date_array.push(element);
        });
        console.log(sugar_date_array);

        setSugarChartData({
          labels: sugar_date_array,
          datasets: [
            {
              data: sugar_array,
              label: "Sugar (Last 7 days)",

              fill: false,
              lineTension: 0.5,
              backgroundColor: "#f7ae63",
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
    weightChart();
    bpChart();
    pulseChart();
    sugarChart();
  }, []);

  const BpSection = useRef(null)
  const PulseSection = useRef(null)
  const SugarSection = useRef(null)
  const WeightSection = useRef(null)


  const goToBpSection = () => window.scrollTo({top: BpSection.current.offsetTop, 
  behavior:"smooth"})

  const goToPulseSection = () => window.scrollTo({top: PulseSection.current.offsetTop, 
    behavior:"smooth"})

  const goToSugarSection = () => window.scrollTo({top: SugarSection.current.offsetTop, 
      behavior:"smooth"})

  const goToWeightSection = () => window.scrollTo({top: WeightSection.current.offsetTop, 
        behavior:"smooth"})

  return (
    <div
      style={{
        backgroundImage: "url(/img/genH1.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      
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
          {ShowHeader(COLORS.genHealthBackground)}
        </div>
        <pre></pre>
        <pre></pre>
        <pre></pre>
        <Row className="body_feature_row">
          <Col style={{ display: "flex", flexDirection: "column" }}>
            <div className="med_header_content">
            </div>
            <div className="reminder_buttons">
            <div
             style={{
              marginLeft: "20%",
              marginBottom: "1%"
            }}>
            <Button style={{
                  color: "#f7ae63", fontWeight : "bold", border : "1px solid #f7ae63"
                }} variant="outlined" onClick={goToBpSection}> Record Your Blood Pressure</Button>
            {" "} {" "} {" "} {" "}
            <Button style={{
                  color: "#f7ae63", fontWeight : "bold", border : "1px solid #f7ae63"
                }} variant="outlined" onClick={goToPulseSection}> Record Your Pulse Rate</Button>
            {" "} {" "} {" "} {" "}
            <Button style={{
                  color: "#f7ae63", fontWeight : "bold", border : "1px solid #f7ae63"
                }} variant="outlined" onClick={goToSugarSection}> Record Your Sugar Level</Button>
            {" "} {" "} {" "} {" "}
            <Button style={{
                  color: "#f7ae63", fontWeight : "bold", border : "1px solid #f7ae63"
                }} variant="outlined" onClick={goToWeightSection}> Record Your Weight</Button>
            </div>

              <Button
                style={{
                  marginLeft: "45%",
                  marginTop: "2%",
                  marginBottom: "2%",
                  backgroundColor: "#f7ae63",
                }}
                variant="outlined"
              >
                <Link
                style={{
                  color : "#000000"
                }}
                  href="/general-health-history"
                  className="reminder_buttons_sub"
                >
                  View History
                </Link>
              </Button>
            </div>

            <div class="container">
              <pre></pre>
              <div  ref={BpSection}>
              <h2 >
               🩸 Blood Pressure
              </h2>
              <Button
                style={{
                  marginLeft: "30%",
                  marginRight: "30%",
                  marginTop: "1%",
                  backgroundColor: "#f7ae63",
                }}
                variant="outlined"
                onClick={viewBpInfo}
               
              >
                  Add Today's Information
              </Button>
              {showBpInfo ? (
                  <div>
                    <BpInfo isVisible={() => viewBpInfo()} />
                  </div>
                ) : (
                  ""
                )}
                <pre></pre>
                <h5  style={{ color: "#f78309",}}>
                Your Blood Pressure for last 7 days<h6>(normal range 120/80)</h6>
              </h5> 
              <Line
                data={bpChartData}
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
              </div>
              <pre></pre>
              <div ref={PulseSection}>
              <h2 >
              💓 Pulse Rate
              </h2>
              <Button
                style={{
                  marginLeft: "30%",
                  marginRight: "30%",
                  marginTop: "1%",
                  backgroundColor: "#f7ae63",
                }}
                variant="outlined"
                onClick={viewPulseInfo}
              >
                  Add Today's Information
              </Button>
              {showPulseInfo ? (
                  <div>
                    <PulseInfo isVisible={() => viewPulseInfo()} />
                  </div>
                ) : (
                  ""
                )}
                <pre></pre>
              <h4  style={{ color: "#f78309",}}>
                Your Pulse for last 7 days{" "}
                <h6>normal rate for an adult: 70-100</h6>{" "}
              </h4>
              <Line
                data={pulseChartData}
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
               </div>
<pre></pre>
              <div ref={SugarSection}>
              <h2 >
              🎚 Sugar Level
              </h2>
              <Button
                style={{
                  marginLeft: "30%",
                  marginRight: "30%",
                  marginTop: "1%",
                  backgroundColor: "#f7ae63",
                }}
                variant="outlined"
                onClick={viewSugarInfo}
              >
                  Add Today's Information
              </Button>
              {showSugarInfo ? (
                  <div>
                    <SugarInfo isVisible={() => viewSugarInfo()} />
                  </div>
                ) : (
                  ""
                )}
                <pre></pre>
              <h4  style={{ color: "#f78309",}}>Your Sugar Level for last 7 days </h4>

              <Line
                data={sugarChartData}
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
              </div>
              <pre></pre>
              <div ref={WeightSection}>
              <h2 >
              👣 Weight
              </h2>
             <Button
                style={{
                  marginLeft: "30%",
                  marginRight: "30%",
                  marginTop: "1%",
                  backgroundColor: "#f7ae63",
                }}
                variant="outlined"
                onClick={viewWeightInfo}
              >
                  Add Today's Information
              </Button>
              {showWeightInfo ? (
                  <div>
                    <WeightInfo isVisible={() => viewWeightInfo()} />
                  </div>
                ) : (
                  ""
                )}
               <pre></pre>
              <h4  style={{ color: "#f78309",}}>Your Weight for Last 7 days</h4>
              <Line
                data={weightChartData}
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
              </div>
            </div>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
          </Col>
          <Col
            className="body_feature_column"
            style={{ position: "fixed" }}
            sm={2}
          >
            {ShowFeatureButtons()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GenHealthDashboard;