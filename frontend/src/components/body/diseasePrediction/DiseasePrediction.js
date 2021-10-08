import React, { useState } from "react";
import { Grid, Button, Select, MenuItem, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import "../../../static/Styling/diseasePrediction.css";
import { getSymptomsList } from "./SymptomsList";
import axios from "axios";
import Prediction from "./Prediction";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";

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
        setDoctor(res.data.diseaseSpecialist);
        setPercentage(res.data.diseasePercenatge);
        console.log("disease", res.data.diseaseSpecialist);
      });
  };

  return (
    <div>
      <div
        class="bg_image"
        style={{
            backgroundImage: "url(/img/disease2.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            opacity: " 0.9",
            backgroundPosition: "absolute",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            maxWidth: 1900,
            padding: 0,
            marginRight: 0,
          }}
        >
          <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.genHealthBackground)}
          </div>
          <pre></pre>
          <pre></pre> <pre></pre> <pre></pre> <pre></pre>
          <pre></pre>
          <Row className="body_feature_row">
            <Col
              className="body_feature_column"
              style={{ position: "fixed" }}
              sm={2}
            >
              {ShowFeatureButtons()}
            </Col>
            <Col
              style={{
                marginLeft: 150,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="intro">
                Identify possible conditions and treatments related to your
                symptoms{" "}
              </div>
              <div className="disease_main">
                <div className="symptoms_body">
                  <div className="symptom">
                    Symptom 1 :{" "}
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
                  </div>
                  <div className="symptom">
                    Symptom 2 :{" "}
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
                  </div>
                  <div className="symptom">
                    Symptom 3 :{" "}
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
                  </div>
                  <div className="symptom">
                    Symptom 4 :{" "}
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
                  </div>
                  <div className="symptom">
                    Symptom 5 :{" "}
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
                  </div>
                  <div className="predict_button">
                    <Button onClick={handleSubmit} className="predict">
                      Predict
                    </Button>
                  </div>
                </div>

                <div className="prediction_body">
                  <Prediction
                  getPrediction={disease}
                  percent={percentage}
                  specialist={doctor}
                />
                </div>

              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}