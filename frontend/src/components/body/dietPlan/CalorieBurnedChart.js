import { Container, Row, Col } from "react-grid-system";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CalorieConsumptionChart() {
  const token = useSelector((state) => state.token);
  const [calorieShedList, setCalorieShedList] = useState([]);

  const getBurnedChart = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getBurnedCalorieList", {
        headers: { Authorization: token },
      })
      .then((res) => setCalorieShedList(res.data));
  };
  {console.log("food", calorieShedList)}
  useEffect(() => {
    getBurnedChart();
  }, []);
  return (
    <>
           
          <Table hover size="md">
            <thead>
              <tr style={{ background: "transparent" }}>
                <th>Activity (User's Weight)</th>
                <th>Duration</th>
                <th>Burned Calories (kcal)</th>

                
              </tr>
            </thead>

            <tbody>
              {calorieShedList.map((burnedCal, index) => (
                <tr
                  style={
                    index % 2 ? { color: "#6f9a37" } : { color: "#f7900a" }
                  }
                >
                  <td>{burnedCal.activity}</td>
                  <td>{burnedCal.time}</td>
                  <td>{burnedCal.calories}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        
    </>
  );
}
