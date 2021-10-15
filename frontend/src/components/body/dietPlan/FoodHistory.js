import React, { useState, useEffect } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";



  export default function FoodItemTable() {
    const token = useSelector((state) => state.token);
    const [foodList, setFoodList] = useState([]);
  
    const getFoodDetailsTable = async () => {
      await axios
        .get("http://localhost:5000/diet-plan/getFoodList", {
          headers: { Authorization: token },
        })
        .then((res) => {setFoodList(res.data)});
    };
    useEffect(async () => {
        getFoodDetailsTable();
      }, []);

      return (
        <div>
          <div className="food_table">
            <div className="diet_info_item_progress"></div>
            <Table hover size="md">
              <thead>
                <tr style={{ background: "transparent" }}>
                  <th>Date</th>
                  <th>Meal Description</th>
                  <th>Item Name</th>
                  <th>Quantity (servings)</th>
                  <th>Calories Consumed (kcal)</th>
                  <th></th>
                </tr>
              </thead>
    
              <tbody>
                {foodList.map((food, index) => (
                  <tr
                    style={
                      index % 2
                        ? { color: "#0777c2" }
                        : { color: "#f7900a" }
                    }
                  >
                    <td>{food.meal}</td>
                    <td>{food.food}</td>
                    <td>{food.quantity}</td>
                    <td>{food.consumedCalories}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );

}