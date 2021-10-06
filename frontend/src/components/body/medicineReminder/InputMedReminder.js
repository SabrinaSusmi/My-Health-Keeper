import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../../static/Styling/medicineReminder.css";
import {
  Grid,
  Paper,
  TextField,
  Button,
  
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
import { makeStyles } from "@material-ui/core";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from '../../../static/Styling/featureButton.css'
import { COLORS } from "../../themeColors";
import { mergeClasses } from "@material-ui/styles";

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
      history.push("/display-medicine-reminderList");
    } catch (err) {
      err.response.data.msg &&
        setMedicine({ ...medicine, err: err.response.data.msg, success: "" });
    }
  };

  const useStyles = makeStyles((theme) => ({
    textfield_input:{
      width:'60%',
      marginLeft:'20%',
      marginBottom:'2%',
    },
    notchedOutline: {
      borderWidth: "1px",
       borderColor: "#fd8412 !important ",
       
    }
  }));
 
  const classes = useStyles();
  return (
    <>
     <Container  style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
    <div style={{backgroundColor:'black', color:'black'}} >{ShowHeader(COLORS.genHealthBackground)}</div>
    
    
    <pre></pre>
    <pre></pre> <pre></pre> <pre></pre> <pre></pre>
    <pre></pre>
    <Row className='body_feature_row' >
      <Col className='body_feature_column' style={{ position:'fixed' }} sm={2}>
        
        {ShowFeatureButtons()}</Col>
      <Col style={{ marginLeft:150 ,display: 'flex', flexDirection: 'column'}}>
    
      <Link href="/display-medicine-reminderList">
        <i class="fas fa-angle-double-left"> &nbsp; Return</i>
      </Link>
      <h2 align="center">Add Medicine</h2> 
      <pre></pre>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
     
      <div className="labels"> Medicine Name</div>
    
          <TextField
           InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}

          className={classes.textfield_input}
            variant="outlined"
            required
            fullWidth
            id="medname"
            // label="Medicine Name"
            name="medname"
            autoComplete="medname"
            onChange={handleChangeInput}
            value={medname}
          />
                       <div className="labels"> Description</div>

          <TextField
            className={classes.textfield_input}
            variant="outlined"
            required
            fullWidth
            id="descriptionmed"
            // label="Description"
            name="descriptionmed"
            autoComplete="descriptionmed"
            onChange={handleChangeInput}
            value={descriptionmed}
          />
                       <div className="labels"> Start Date</div>

          <TextField
            className={classes.textfield_input}
            variant="outlined"
            required
            fullWidth
            id="startdate"
            // label="Start Date"
            name="startdate"
            onChange={handleChangeInput}
            value={startdate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="labels"> End Date</div>
          <TextField
            className={classes.textfield_input}
            variant="outlined"
            required
            fullWidth
            id="enddate"
            // label="End Date"
            name="enddate"
            onChange={handleChangeInput}
            value={enddate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
             <div className="labels"> Time</div>
        
        {inputFields.map((inputField, index) => (
          <div  className="textfield" key={index}>
            <TextField
            
             className="textfield"
              variant="outlined"
              required
              
              id="time"
              // label="Time"
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
        <div  className="form_btns" >
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
     
    
    </Col>
    </Row>
  </Container>
  </>
  );
}

export default InputMedReminder;
