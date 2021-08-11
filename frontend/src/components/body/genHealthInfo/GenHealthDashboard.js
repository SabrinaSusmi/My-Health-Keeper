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
    const [chartData, setChartData] = useState({});

  const chart = () => {
    let sugar_array = [];
    let date_array = [];
    axios
      .get("http://localhost:5000/getChart/Weight", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        console.log(res.data.infoData);
        console.log(res.data.dates);
        // sugar_array.push(parseInt(res.data.infoData)); //push data from db into the array
        // date_array.push((res.data.dates));
        console.log(date_array);
        res.data.infoData.forEach(element => {
            sugar_array.push(element);
        });
        res.data.dates.forEach(element=> {
            date_array.push(element);
        });
        
        // for (const dataObj of res.data.data) {
        //   sugar_array.push(parseInt(dataObj.infoData)); //push data from db into the array
        //   date_array.push(parseInt(dataObj.dates));
        // }
        setChartData({
          labels: date_array,
          datasets: [
            {
              data: sugar_array,
              label: "Rainfall",
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
    chart();
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
            data={chartData}
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
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
    </div>
  );
}

export default GenHealthDashboard;