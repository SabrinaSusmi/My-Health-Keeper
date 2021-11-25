import { Container, Row, Col } from "react-grid-system";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CalorieConsumptionChart() {
  const token = useSelector((state) => state.token);
  const [foodList, setFoodList] = useState([]);

  const getRice = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getBurnedCalorieList", {
        headers: { Authorization: token },
      })
      .then((res) => setFoodList(res.data));
  };
  {console.log("food", foodList)}
  useEffect(() => {
    getRice();
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
              {foodList.map((food, index) => (
                <tr
                  style={
                    index % 2 ? { color: "#6f9a37" } : { color: "#f7900a" }
                  }
                >
                  <td>{food.activity}</td>
                  <td>{food.time}</td>
                  <td>{food.calories}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        
    </>
  );
}
