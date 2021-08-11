import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

const SugarModal = ({ showSugarModal, setShowSugarModal }) => {
  const token = useSelector((state) => state.token);
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let sugar_array = [15];
    let date_array = [1];
    axios
      .get("http://localhost:5000/getChart/Sugar", {
        headers: { Authorization: token },
      }) //get info and input date from db
      .then((res) => {
        console.log(res);
        sugar_array.push(parseInt(res.infoData)); //push data from db into the array
        date_array.push(parseInt(res.dates));
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

  const closeSugarModal = () => {
    setShowSugarModal(false);
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSugarModal}
        onHide={closeSugarModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>Hello Sugar Level</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Graph</h2>

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
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeSugarModal();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SugarModal;
