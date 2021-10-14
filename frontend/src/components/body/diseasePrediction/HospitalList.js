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

export default function ShowHospitalList(){
    return(
        <>
        <Container>
            <Row style={{marginLeft:'19%'}}>
                <Col sm={3} className='hospital_list' className='symptoms_body' >jiji</Col>
                <Col sm={3} className='hospital_list' className='symptoms_body'>bbubbu</Col>
                <Col sm={3} className='hospital_list' className='symptoms_body'>bbubbu</Col>
            </Row>
        </Container>
        </>
    )

}