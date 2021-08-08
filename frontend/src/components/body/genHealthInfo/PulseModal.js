import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import axios from "axios";


const PulseModal = ({showPulseModal, setShowPulseModal}) => {

    const [chartData, setChartData] = useState({});
  

    const chart = () => {
      let pulse_array = [];
      let date_array = [];
      axios
        .get("http://dummy.restapiexample.com/api/v1/employees") //get info and input date from db
        .then(res => {
          console.log(res);
          for (const dataObj of res.data.data) {
            pulse_array.push(parseInt(dataObj.employee_salary)); //push data from db into the array
            date_array.push(parseInt(dataObj.employee_age));
          }
          setChartData({
            labels: date_array,
            datasets: [
              {
                data:  pulse_array,
                label: "Rainfall",
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      
    };
    useEffect(() => {
      chart();
    }, []);

    
    const closePulseModal = () => {
        setShowPulseModal(false);
        };
     
        return (
            <>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showPulseModal}
                onHide={closePulseModal}
                
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Pulse Rate</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>

                        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Pulse Graph", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => {closePulseModal()}}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
           
            </>
      )

}

export default PulseModal;