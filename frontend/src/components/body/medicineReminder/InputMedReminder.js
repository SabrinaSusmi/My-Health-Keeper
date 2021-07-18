import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../../static/Styling/medicineReminder.css";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  IconButton,
  Link,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import "../../../static/Styling/medicineReminder.css";
import { Redirect, useHistory } from "react-router-dom";
const initialState = {
  username: "",
  medName: "",
  descriptionmed: "",
  startdate: "",
  enddate: "",
  doses: [],
  err: "",
  success: "",
};

function InputMedReminder() {
  const token = useSelector((state) => state.token);
  const history = useHistory();
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [medicine, setMedicine] = useState(initialState);

  const {
    username,
    medname,
    descriptionmed,
    startdate,
    enddate,
    doses,
    err,
    success,
  } = medicine;

  const [inputFields, setInputFields] = useState([{ time: "" }]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value, err: "", success: "" });
  };

  const handleChangeInputTime = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    // const newInputFields = inputFields.map(i => {
    //   if(id === i.id) {
    //     i[event.target.name] = event.target.value
    //   }
    //   return i;
    // })
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { time: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("InputFields", inputFields);

    //username = user.name;
    //doses = inputFields;
    try {
      const res = await axios.post(
        "http://localhost:5000/medReminder",
        {
          username: user.name,
          medname,
          descriptionmed,
          startdate,
          enddate,
          doses: inputFields,
          userEmail: user.email,
        },
        {
          headers: { Authorization: token },
        }
      );

      setMedicine({
        ...medicine,
        err: "",
        success: "Medicine added Successfully!",
      });
      history.push('/display-medicine-reminderList')
    } catch (err) {
      err.response.data.msg &&
        setMedicine({ ...medicine, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <Container className="container">
            <div>
        <Link href="/display-medicine-reminderList">
          <Button type="button" color="primary" size="large">
            <i class="fas fa-angle-double-left" >
              {" "}
              &nbsp; Return
            </i>
          </Button>
        </Link>
      </div>
      <div className="paper">
        <Grid align="center">
          <h2>Add Medicine</h2>{" "}
        </Grid>{" "}
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <form onSubmit={handleSubmit} className="form_body">
          <div className="form_inputs">
            <TextField
              variant="outlined"
              required
              fullWidth
              id="medname"
              label="Medicine Name"
              name="medname"
              autoComplete="medname"
              onChange={handleChangeInput}
              value={medname}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="descriptionmed"
              label="Description"
              name="descriptionmed"
              autoComplete="descriptionmed"
              onChange={handleChangeInput}
              value={descriptionmed}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="startdate"
              label="Start Date"
              name="startdate"
              onChange={handleChangeInput}
              value={startdate}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="enddate"
              label="End Date"
              name="enddate"
              onChange={handleChangeInput}
              value={enddate}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {inputFields.map((inputField, index) => (
            <div key={index}>
              <TextField
                variant="outlined"
                required
                id="time"
                label="Time"
                name="time"
                onChange={handleChangeInputTime}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                //variant="filled"
                value={inputField.time}
                onChange={(event) => handleChangeInputTime(index, event)}
              />

              <IconButton
                disabled={inputFields.length === 1}
                onClick={() => handleRemoveFields(index)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddFields}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <div className="form_btns">
            <Button
              className="add_btn"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
            >
              Add
            </Button>
           
          </div>
        </form>
      </div>
    </Container>
  );
}

export default InputMedReminder;
