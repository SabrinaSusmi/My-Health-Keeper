import React, { useState, useEffect } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,TextField,IconButton } from "@material-ui/core";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from "react-redux";
import { Select, MenuItem, makeStyles } from "@material-ui/core";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";
//import {getRice, riceList} from "./FoodList"
import Autocomplete from '@material-ui/lab/Autocomplete';

const InitialState = {
    meal: "",
    food: "",
    quantity: "",
    err: "",
    success: "",
  };

const AddFoodModal = ({showFoodModal, setShowFoodModal}) => {
    const token = useSelector((state) => state.token);
    const [riceItem, setRiceItem] = useState([]);

    const getRice = async () => {
    
        await axios
          .get("http://localhost:5000/diet-plan/getFoodMenu", {
            headers: { Authorization: token },
          })
          .then((res) => setRiceItem(res.data));
    };
    const options = riceItem.map((option) => {
      const initialLetter = option.category;
      return {
        initialLetter,
        ...option,
      };
    });

    const [item, setItem] = useState(InitialState);

    const { meal, food, quantity, err, success } = item;

    const handleChange = (e) => {
        // console.log(e.target);
        const { name, value } = e.target;
        setItem({ ...item, [name]: value, err: "", success: "" });
      };


    const closeFoodModal = () => {
        setShowFoodModal(false);
      };

    useEffect(async () => {
        getRice(); 
      }, []);

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

      // let riceArr = riceList();
      // const symptomList = () => {
      //   let a = [];
      //   for (let i = 0; i < riceArr.length; i++) {
      //     a.push(<MenuItem value={riceArr[i]}>{riceArr[i]}</MenuItem>);
      //   }
      //   return a;
      // };

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
                    {/* <div>
                    Food Name:{" "}
                    <Select
                      id="foodName"
                      name="food"
                      value={food}
                      onChange={handleChange}
                      // displayEmpty
                      className="form_btn"
                    >
                      {symptomList()}
                    </Select>
                    </div> */}
                    <Autocomplete
                      onChange={(event, value) => setItem({food : value.name})}
                      getOptionSelected={(option, value) => option.id === value.id}
                      options={options.sort((a, b) =>
                        -b.initialLetter.localeCompare(a.initialLetter))}
                      groupBy={(option) => option.initialLetter}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params}
                      className="form_btn"
                      
                      label="Food Name"
                      
                       />}
                    />
                    {/* <TextField
                      className="form_btn"
                      type="text"
                      id="foodName"
                      name="food"
                      label="Food Name"
                      value={food}
                      onChange={handleChange}
                    ></TextField> */}

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