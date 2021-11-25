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
          
          <Table hover size="md" style={{'display': 'block',justifyContent:'center',width:'650px',marginLeft:'27%'}}>
            <thead style={{'display': 'block',justifyContent:'center',width:'800px'}}>
              <tr style={{ background: "transparent" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <th>Activity (User's Weight)</th> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <th>Duration</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <th>Burned Calories (kcal)</th>

                
              </tr>
            </thead>

            <tbody style={{'height': '500px', 'overflow':'scroll', 'display': 'block',paddingTop:'1%'}}>
              {calorieShedList.map((burnedCal, index) => (
                <tr
                  style={
                    index % 2 ? { color: "#6f9a37" } : { color: "#f7900a" }
                  }
                >
                  <td>{burnedCal.activity}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>{burnedCal.time}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>{burnedCal.calories}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        
    </>
  );
}
