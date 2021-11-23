import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Select, IconButton, Grid } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";

const HistoryModal = ({ showWeightModal, setShowWeightModal }) => {
  const token = useSelector((state) => state.token);
  const [chartData, setChartData] = useState({});
  const [year, setYear] = useState("0");
  const [consumedCaloriesData, setYearlyMenstrualCycleLengthData] = useState(
    {}
  );

  useEffect(() => {
    menstrualCycleLengthChart();
  }, []);

  const menstrualCycleLengthChart = () => {
    let cycleLengthArray = [];
    let monthArray = [];
    setYearlyMenstrualCycleLengthData({
      labels: monthArray,
      datasets: [
        {
          data: cycleLengthArray,
          label: "Number Of Days",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#f8889e",
          borderColor: "#f8889e",
          borderWidth: 2,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    let cycleLengthArray = [];
    // let req_cal_data = [];
    let monthArray = [];
    e.preventDefault();
    console.log(year);
    await axios
      .get(
        "http://localhost:5000/user/getGraphData",

        {
          headers: { Authorization: token, year: year },
        }
      )
      .then((res) => {
        console.log(year);
        res.data.cycleLengthArray.forEach((element) => {
          cycleLengthArray.push(element);
        });
        cycleLengthArray.push(22);
        cycleLengthArray.push(32);
        // res.data.req_cal.forEach((element) => {
        //   req_cal_data.push(element);
        // });
        res.data.monthArray.forEach((element) => {
          monthArray.push(element);
        });
        //  setToalCal(res.data.totalCal);
        console.log(cycleLengthArray);

        setYearlyMenstrualCycleLengthData({
          labels: monthArray,
          datasets: [
            {
              data: cycleLengthArray,
              label: "Number Of Days",
              fill: false,
              lineTension: 0.5,
              backgroundColor: "#f8889e",
              borderColor: "#f8889e",
              borderWidth: 2,
              pointRadius: 5,
            },
          ],
        });
      })
      .catch((err) => {
        // err.response.data.msg &&
        // setItem({ ...item, err: err.response.data.msg, success: "" });
      });
  };

  const closeWeightModal = () => {
    setShowWeightModal(false);
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showWeightModal}
        onHide={closeWeightModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>Visualize Your Menstruation Data </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            // className={classes.formControl}
            type="text"
            id="selectedMonth"
            name="selectedMonth"
            className="menstrual_year_progress_select"
            // defaultValue={currentMonth}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            // padding="10px"
            label="selectedMonth"
          >
            <option disabled value="0">
              Select Year
            </option>
            <option value={"2021"}>2021</option>
            <option value={"2020"}>2020</option>
            <option value={"2019"}>2019</option>
            <option value={"2018"}>2018</option>
            <option value={"2017"}>2017</option>
            <option value={"2016"}>2016</option>
            <option value={"2015"}>2015</option>
            <option value={"2014"}>2014</option>
            <option value={"2013"}>2013</option>
            <option value={"2012"}>2012</option>
            <option value={"2011"}>2011</option>
          </Select>
          <IconButton onClick={(e) => handleSubmit(e)} style={{ padding: 0 }}>
            <VisibilityIcon />
          </IconButton>
          <br></br>
          Number Of Days Between Two Cycle
          <Line
            data={consumedCaloriesData}
            options={{
              responsive: true,
              title: { text: "Cycle Length", display: true },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 12,
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeWeightModal();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryModal;
