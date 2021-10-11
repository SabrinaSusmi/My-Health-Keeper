import React,{useState, useEffect} from 'react'
import Table from "react-bootstrap/Table";
import {IconButton,Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddFoodModal from "./addFoodModal";
import '../../../static/Styling/diet.foodItemTable.css'
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useSelector } from "react-redux";
import axios from "axios";

export default function FoodItemTable() {
  const token = useSelector((state) => state.token);
    
  const [showFoodModal, setShowFoodModal] = useState(false);
  const openFoodModal = () => setShowFoodModal(true);

  const [foodList, setFoodList] = useState([]);

  const getFoodConsumed = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getFoodList", {
        headers: { Authorization: token },
      })
      .then((res) => setFoodList(res.data));
  };
  useEffect(async () => {
    getFoodConsumed(); 
  }, []);

  const deleteFood = async (id) => {
    await axios
      .delete("http://localhost:5000/diet-plan/foodList/delete/" + id, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

    const removedFood = [...foodList].filter(
      (el) => el._id !== id
    );
    setFoodList(removedFood);
  };

  return (
      <div>
   
      <div className="food_table">

        <div>
       
         

        </div>
      
        <Table hover size="md">
          <thead>
            <tr style={{background:'#eae6e6da'}}>
            <th>Meal Description</th>
             <th>Item Name</th>
              <th>Quantity (servings)</th>
             
              <th>Calories Consumed (kcal)</th>
             
              <th></th>
            </tr>
          </thead>
          
          <tbody>
          {foodList.map((food,index) => (
                    <tr style={index % 2? { background : "#f8db57",   }:{ background : "#f4c805" }} >
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
  )
}
