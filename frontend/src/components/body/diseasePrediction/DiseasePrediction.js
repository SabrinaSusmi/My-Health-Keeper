import React, { useState } from "react";
import { Grid, Button, Select, MenuItem, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../../../static/Styling/diseasePrediction.css";
import { getSymptomsList } from "./SymptomsList";
import axios from "axios";
import Prediction from "./Prediction";
const initialState = {
  s1: "",
  s2: "",
  s3: "",
  s4: "",
  s5: "",
};
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    margin: theme.spacing(2),
    minWidth: 320,
    color: "#04272f",
  },
}));

export default function SymptomSelection() {
  const token = useSelector((state) => state.token);
  let arr = getSymptomsList();
  const [symptom, setSymptom] = useState(initialState);
  const [disease, setDisease] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [doctor, setDoctor] = useState("");
   const { s1, s2, s3, s4, s5 } = symptom;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSymptom({ ...symptom, [name]: value });
  };

  const symptomList = () => {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
      a.push(<MenuItem value={arr[i]}>{arr[i]}</MenuItem>);
    }
    return a;
  };

  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get(
        "http://localhost:5000/disease-prediction",

        {
          headers: {
            Authorization: token,
            s1: s1,
            s2: s2,
            s3: s3,
            s4: s4,
            s5: s5,
          },
        }
      )
      .then((res) => {
        setDisease(res.data.diseaseName);
setDoctor(res.data.diseaseSpecialist)
setPercentage(res.data.diseasePercenatge)
        console.log("disease", res.data.diseaseSpecialist);
      });
  };
 
  return (
    <div>
      <div className='intro'>
        Identify possible conditions and treatments related to your symptoms{" "}
      </div>
      <Grid className="root" container>
        <Grid className="grid_symptoms" item xs={5}>
          Symptoms 1 :{" "}
          <Select
            id="s1"
            name="s1"
            value={s1}
            onChange={handleChangeInput}
            // displayEmpty
            className={classes.selectEmpty}
          >
            {symptomList()}
          </Select>
        </Grid>
        <Grid className="grid_symptoms" item xs={5}>
          {" "}
          Symptoms 2 :{" "}
          <Select
            id="s2"
            name="s2"
            value={s2}
            onChange={handleChangeInput}
            // displayEmpty
            className={classes.selectEmpty}
          >
            {symptomList()}
          </Select>
        </Grid>

        <Grid className="grid_symptoms" item xs={5}>
          {" "}
          Symptoms 3 :{" "}
          <Select
            id="s3"
            name="s3"
            value={s3}
            onChange={handleChangeInput}
            // displayEmpty
            className={classes.selectEmpty}
          >
            {symptomList()}
          </Select>
        </Grid>
        <Grid className="grid_symptoms" item xs={5}>
          {" "}
          Symptoms 4 :{" "}
          <Select
            id="s4"
            name="s4"
            value={s4}
            onChange={handleChangeInput}
            // displayEmpty
            className={classes.selectEmpty}
          >
            {symptomList()}
          </Select>
        </Grid>
        <Grid item xs={4}>
          {" "}
        </Grid>

        <Grid className="grid_symptoms" item xs={5}>
          {" "}
          Symptoms 5 :{" "}
          <Select
            id="s5"
            name="s5"
            value={s5}
            onChange={handleChangeInput}
            // displayEmpty
            className={classes.selectEmpty}
          >
            {symptomList()}
          </Select>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <div className="predict_button">
        <Button onClick={handleSubmit} className="predict">
          Predict
        </Button>
      </div>
      <Prediction getPrediction={disease} percent={percentage} specialist={doctor} />
    </div>
  );
}
