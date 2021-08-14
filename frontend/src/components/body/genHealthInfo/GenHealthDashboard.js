import React from "react";
import { useState, useEffect } from "react";
import "../../../static/Styling/medicineReminder.css";
import "../../../static/Styling/healthInfo.css";
import { Button, IconButton, Link } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";

function GenHealthDashboard() {
    const token = useSelector((state) => state.token);
    const [weightChartData, setWeightChartData] = useState({});
    const [bpChartData, setBpChartData] = useState({});
    const [pulseChartData, setPulseChartData] = useState({});
    const [sugarChartData, setSugarChartData] = useState({});

  const weightChart = () => {
    let weight_array = [];
    let weight_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Weight", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {

        res.data.infoData.forEach(element => {
            weight_array.push(element);
        });
        res.data.dates.forEach(element=> {
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

  const bpChart = () => {
    let bp_array = [];
    let bp_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Bp", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {

        res.data.infoData.forEach(element => {
            bp_array.push(element);
        });
        res.data.dates.forEach(element=> {
            bp_date_array.push(element);
        });
        console.log(bp_date_array);

        setBpChartData({
          labels: bp_date_array,
          datasets: [
            {
              data: bp_array,
              label: "Blood Pressure (Last 7 days)",
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

  const pulseChart = () => {
    let pulse_array = [];
    let pulse_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Pulse", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {

        res.data.infoData.forEach(element => {
            pulse_array.push(element);
        });
        res.data.dates.forEach(element=> {
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

  const sugarChart = () => {
    let sugar_array = [];
    let sugar_date_array = [];
    axios
      .get("http://localhost:5000/getChart/Sugar", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {

        res.data.infoData.forEach(element => {
            sugar_array.push(element);
        });
        res.data.dates.forEach(element=> {
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
    weightChart();
    bpChart();
    pulseChart();
    sugarChart();
  }, []);
  return (
    <div>
      {" "}
      &nbsp;
      <div className="reminder_buttons">
        <Link
          href="/general-health-information"
          className="reminder_buttons_sub"
        >
          {""} Add Today's Information
        </Link>
      </div>

      <div class="container">
  <div>
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
          /></div>
  <div>
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
  <div>
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
  <div>
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
</div>
    </div>
  );
}

export default GenHealthDashboard;