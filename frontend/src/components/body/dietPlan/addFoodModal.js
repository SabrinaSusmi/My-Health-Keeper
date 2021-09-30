import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,TextField,IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value, err: "", success: "" });
      };


    const closeFoodModal = () => {
        setShowFoodModal(false);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        await axios
          .post(
            "http://localhost:5000/",
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
                <form onSubmit={handleSubmit}>
                  <label>
                    Meal Description :
                    <select onChange={handleChange}>
                      <option name="meal" value="Breakfast">
                        Breakfast
                      </option>
                      <option name="meal" value="Lunch">
                        Lunch
                      </option>
                      <option name="meal" value="Dinner">
                        Dinner
                      </option>
                      <option name="meal" value="Snacks">
                        Snacks
                      </option>
                    </select>
                  </label>

                  <div  className="form_body">
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
                <form>
                  {/* <div className="mod_btn">
                    <label for="meal_name">Meal Description : </label>
                    <input
                      type="meal_name"
                      // onChange={handleChangeInput}
                      name="meal_name"
                    />
                  </div> */}
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