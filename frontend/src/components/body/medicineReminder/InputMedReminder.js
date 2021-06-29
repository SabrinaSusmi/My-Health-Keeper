import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  IconButton,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

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
  const token = useSelector(state => state.token)

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
      const res = await axios.post("/medReminder", {
        username : user.name,
        medname,
        descriptionmed,
        startdate,
        enddate,
        doses: inputFields,
      },{
        headers: {Authorization: token}
    });

      setMedicine({ ...medicine, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setMedicine({ ...medicine, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <Container>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Add Medicine</h2>
          </Grid>
          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default InputMedReminder;