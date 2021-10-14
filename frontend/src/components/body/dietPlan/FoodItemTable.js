import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../../static/Styling/dietFoodTable.css";
import "../../../static/Styling/diet.foodItemTable.css";
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useSelector } from "react-redux";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";


export default function FoodItemTable() {
  const token = useSelector((state) => state.token);
  const [multipleProgress, setMultipleProgress] = useState(0.0);
  const [foodList, setFoodList] = useState([]);
  const [consumed, setConsumed] = useState("");
  const [required, setRequired] = useState("");
  const [remaining, setRemaining] = useState("");
  const getFoodConsumed = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getFoodList", {
        headers: { Authorization: token },
      })
      .then((res) => {setFoodList(res.data)});
  };
  const getDietSummaryOfTheDay = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getDietSummaryOfTheDay", {
        headers: { Authorization: token },
      })
      .then((res) => {

        setConsumed(res.data.consumedCalories);
        setRequired(res.data.requiredCalories);
        setRemaining(res.data.requiredCalories - res.data.consumedCalories);
        const percentage = (parseFloat(res.data.consumedCalories / res.data.requiredCalories).toFixed(4))*100;
setMultipleProgress(percentage)
        console.log(res.data);
      });
  };
  useEffect(async () => {
    getFoodConsumed();
    // getDietSummaryOfTheDay();
  }, []);

  const deleteFood = async (id) => {
    await axios
      .delete("http://localhost:5000/diet-plan/foodList/delete/" + id, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

    const removedFood = [...foodList].filter((el) => el._id !== id);
    setFoodList(removedFood);
  };

  return (
    <div>
      <div className="food_table">
        <div className="diet_info_item_progress"></div>
        <Table hover size="md">
          <thead>
            <tr style={{ background: "transparent" }}>
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

                <td>
                  <IconButton
                    className="btn"
                    data-toggle="tooltip"
                    title="Delete"
                    onClick={() => deleteFood(food._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
