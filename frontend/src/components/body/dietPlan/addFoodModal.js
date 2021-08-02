import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,TextField,IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";


const AddFoodModal = ({showFoodModal, setShowFoodModal}) => {
    const [inputFields,setInputField] = useState([
        { foodName: '', quantity: ''},
    ])
    
    const closeFoodModal = () => {
        setShowFoodModal(false);
      };
    const handleAddFields=()=>{
        setInputField([...inputFields,{foodName:'', quantity:''}]);
    }
    const handleRemoveFields=(index)=>{
        const values =[...inputFields];
        values.splice(index, 1);
        setInputField(values);
    }

      const handleChangeInputFood = (index,event) => {
       const values =[...inputFields];
       values[index][event.target.name]= event.target.value;
       setInputField(values);
      };
    
        return (
            <>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showFoodModal}
                onHide={closeFoodModal}
               
                >
                    <Modal.Header>
                    <Modal.Title><h4>🍀 Add Food Items</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <form >
                            <div className="mod_btn">
                                <label for="meal_name">Meal Description : </label>
                                <input
                                    type="meal_name"
                                    // onChange={handleChangeInput}
                                    name="meal_name"
                                />
                            </div>
                            
                                { inputFields.map((inputField, index)=>(
                                    <div key = {index} className="form_body">
                                         <TextField
                                         className="form_btn"
                                         type="text"
                                         id="foodName"
                                         name="foodName"
                                         label="Food Name"
                                         value={inputField.foodName}
                                         onChange={event=>handleChangeInputFood(index,event)}
                                         ></TextField>

                                         <TextField
                                        className="form_btn"
                                         type="text"
                                         id="quantity"
                                         name="quantity"
                                         label="Quantity"
                                         value={inputField.quantity}
                                         onChange={event=>handleChangeInputFood(index,event)}
                                         ></TextField>
                                         
                                         <IconButton
                                          className="form_btn" 
                                          disabled={inputFields.length === 1}
                                          onClick={() => handleRemoveFields(index)}>
                                             <RemoveIcon/>
                                         </IconButton>
                                         <IconButton
                                         className="form_btn" 
                                         onClick={handleAddFields}>
                                             <AddIcon/>
                                         </IconButton>
                                         
                                    </div>
                                ))}
                           
                        </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" >
                                        Save
                            </Button>
                            <Button variant="secondary" onClick={() => {closeFoodModal()}}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
              
            </>
      )

}

export default AddFoodModal;