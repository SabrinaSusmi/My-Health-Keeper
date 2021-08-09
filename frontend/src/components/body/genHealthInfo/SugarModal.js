import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import axios from "axios";


const SugarModal = ({showSugarModal,setShowSugarModal}) => {
    

  const [chartData, setChartData] = useState({});
  

  const chart = () => {
    let sugar_array = [];
    let date_array = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees") //get info and input date from db
      .then(res => {
        console.log(res);
        for (const dataObj of res.data.data) {
          sugar_array.push(parseInt(dataObj.employee_salary)); //push data from db into the array
          date_array.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: date_array,
          datasets: [
            {
              data:sugar_array,
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
                    <Modal.Title><h4>Hello Sugar Level</h4></Modal.Title>
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
                            <Button variant="secondary"  onClick={() => {closeSugarModal()}}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
            </>
      )

}

export default SugarModal;