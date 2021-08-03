import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const state = {
  labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 99, 92],
    },
  ],
};

const WeightModal = ({ showWeightModal, setShowWeightModal }) => {
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
            <h4>Hello Weight</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Graph</h2>
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
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

export default WeightModal;