import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,TextField,IconButton } from "@material-ui/core";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";

const InitialState = {
    meal: "",
    food: "",
    quantity: "",
    err: "",
    success: "",
  };

const AddFoodModal = ({showFoodModal, setShowFoodModal}) => {
    const token = useSelector((state) => state.token);

    const [item, setItem] = useState(InitialState);

    const { meal, food, quantity, err, success } = item;

    const [items] = React.useState([
        { label: "Breakfast",value: "Breakfast" },
        { label: "Lunch",value: "Lunch" },
        { label: "Dinner",value: "Dinner" },
        { label: "Snacks",value: "Snacks" }
      ]);

    const handleChange = (e) => {
        // console.log(e.target);
        const { name, value } = e.target;
        setItem({ ...item, [name]: value, err: "", success: "" });
      };

      const handleSelect=(e)=>{
        console.log(e);
      }


    const closeFoodModal = () => {
        setShowFoodModal(false);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        await axios
          .post(
            "http://localhost:5000/diet-plan/addFoodItem",
            {
              meal,
              food,
              quantity,
            },
            {
              headers: { Authorization: token },
            }
          )
          .then((res) => {
            setItem({ ...item,  err: "", success: "Food added successfully!" });
          })
          .catch((err) => {
            err.response.data.msg &&
            setItem({ ...item, err: err.response.data.msg, success: "" });
          });
    
        setTimeout(function () {
          setItem(InitialState);
        }, 3000);
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
                <Modal.Title>
                  <h4>🍀 Add Food Items</h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  {/* <label>
                    Meal Description : */}
                    {/* <DropdownButton
                      title=""
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="Breakfast">
                      Breakfast
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Lunch">
                        Lunch
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Dinner">
                        Dinner
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Snacks">
                        Snacks
                      </Dropdown.Item>
                    </DropdownButton> */}
                    {/* <select onSelect={handleSelect}>
                      {items.map((item) => (
                        <option onChange={handleSelect} name="meal" key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select> */}
                    {/* <select value={meal} onSelect={handleSelect} onChange={handleChange}>
                      <option name="meal" value="Breakfast">
                        Breakfast
                      </option>
                      <option name="meal" value="Lunch">
                        Lunch
                      </option>
                      <option eventKey="Dinner" name="meal" value="Dinner">
                        Dinner
                      </option>
                      <option name="meal" value="Snacks">
                        Snacks
                      </option>
                    </select> */}
                  {/* </label> */}

                  <div className="form_body">
                  <TextField
                      className="form_btn"
                      type="text"
                      id="meal"
                      name="meal"
                      label="Meal Description"
                      value={meal}
                      onChange={handleChange}
                    ></TextField>
                    <TextField
                      className="form_btn"
                      type="text"
                      id="foodName"
                      name="food"
                      label="Food Name"
                      value={food}
                      onChange={handleChange}
                    ></TextField>

                    <TextField
                      className="form_btn"
                      type="text"
                      id="foodName"
                      name="quantity"
                      label="Quantity"
                      value={quantity}
                      onChange={handleChange}
                    ></TextField>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="add_btn"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    closeFoodModal();
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );

}

export default AddFoodModal; 