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

  return (
      <div>
          <div className="add_food">
        <Button className="add_food_btn" onClick={openFoodModal}>
          <IconButton aria-label="add">
            <AddCircleOutlineRoundedIcon />
          </IconButton>
          {""} Add Food Item
        </Button>
      </div>
      <AddFoodModal
      showFoodModal={showFoodModal}
      setShowFoodModal={setShowFoodModal}
    />
      <div className="food_table">
        <Table hover size="md">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Meal Description</th>
              <th>Calories Consumed</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {foodList.map((food) => (
                    <tr>
                      <td>{food.food}</td>
                      <td>{food.quantity}</td>
                      <td>{food.meal}</td>
                      <td>{food.consumedCalories}</td>
                      <td>
                      <IconButton
                        className="btn"
                        data-toggle="tooltip"
                        title="Edit"
                        //onClick={() => deleteReminder(medicines._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      </td>
                      <td>
                      <IconButton
                        className="btn"
                        data-toggle="tooltip"
                        title="Delete"
                        //onClick={() => deleteReminder(medicines._id)}
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
