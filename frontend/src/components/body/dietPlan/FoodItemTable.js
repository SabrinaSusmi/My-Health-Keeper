import React,{useState} from 'react'
import Table from "react-bootstrap/Table";
import {IconButton,Button} from "@material-ui/core";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddFoodModal from "./addFoodModal";
import '../../../static/Styling/diet.foodItemTable.css'
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export default function FoodItemTable() {
    const [showFoodModal, setShowFoodModal] = useState(false);
    const openFoodModal = () => setShowFoodModal(true);
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
                <th>#</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Meal Description</th>
                <th>Calories Consumed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>1</td>
                <td>Rice</td>
                <td>2 cups</td>
                <td>Lunch</td>
                <td>173</td> */}
              </tr>
            </tbody>
          </Table>
        </div>
          
        </div>
    )
}
