import React, { useState } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import "../../../static/Styling/diseasePrediction.css";
import { getSymptomsList } from "./SymptomsList";
import axios from "axios";
import SymptomSelection from "./SymptomSelection";


export default function DiseasePrediction() {
  let arr = getSymptomsList();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  // const [symptom, setSymptom] = useState(initialState);
  const [disease, setDisease] = useState("");

  
  return (
    <div>
      <h3>
        Identify possible conditions and treatments related to your symptoms{" "}
      </h3>
     <SymptomSelection/>
    </div>
  );
}
