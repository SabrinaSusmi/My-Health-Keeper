import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/menstrualCycle.css";
import "../../../static/Styling/mensDemo.css";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from '../../../static/Styling/featureButton.css'
import { COLORS } from "../../themeColors";

const initialState = {
    startdate: "",
    enddate: "",
    duration: "",
    cycleLength: "",
    err: "",
    success: "",
    eventDate: "",
    mood: "",
    symptoms: "",
    flow: "",
  };


export default function MenstrualDemo(){
    const [initialData, setInitialData] = useState(initialState);
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const { user, isLogged } = auth;

    const {
        startDate,
        endDate,
        duration,
        cycleLength,
        err,
        success,
        eventDate,
        mood,
        symptoms,
        flow,
      } = initialData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInitialData({ ...initialData, [name]: value, err: "", success: "" });
      };
    return(
        <div>
            
            <div
                class="bg_image"
                style={{
                    backgroundImage: "url(/img/mens_pink.jpg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    opacity: " 0.8",
                    backgroundPosition: "center",
                }}
                >  <Container  style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
                <div style={{backgroundColor:'black', color:'black'}} >{ShowHeader(COLORS.spHealthBackground)}</div>
                
                
                 <pre></pre> <pre></pre> <pre></pre>
                <pre></pre>
                <Row className='body_feature_row' >
                  <Col className='body_feature_column' style={{ position:'fixed' }} sm={2}>
                  <pre></pre>
                <pre></pre>  
                    {ShowFeatureButtons()}</Col>
                  <Col style={{ marginLeft:120 ,display: 'flex', flexDirection: 'column'}}>
                    <div className="mens">
                    <div className="mens_body">
                        <div className="mens_info">
                            <div className="info_section">
                                <div className="info_item">
                                    <p>17 days since last period.</p>
                                </div>
                                <div className="info_item">
                                    <p>The last cycle was 28 days long.</p>
                                </div>
                                <div className="info_item">
                                    <p>Want to know about your period?</p>
                                </div>
                            </div>
                            <div className="input_form">
                                <Grid align='center'>
                                    <h4>Input your data 💓 </h4>
                                </Grid>
                                {/* <TextField label='Start date' placeholder='Enter username' fullWidth required/>
                                <TextField label='End date' placeholder='Enter password' type='password' fullWidth required/> */}
                                <Grid container  alignItems="center" >
                                    <TextField
                                    className="input_fields"
                                    fullWidth
                                    required
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    onChange={handleChangeInput}
                                    value={startDate}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    />
                                </Grid>
                                <Grid container alignItems="center">
                                    <TextField
                                    className="input_fields"
                                    fullWidth
                                    type="date"
                                    required
                                    id="endDate"
                                    name="endDate"
                                    onChange={handleChangeInput}
                                    value={endDate}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    />
                                </Grid>
                                
                                {/* <Button className="mens_button" type='submit' color='primary' variant="contained">Submit</Button> */}
                                <Button className="mens_button" variant="contained" type="submit">Submit</Button>
                                
                            </div>
                        </div>
                        <div className="mens_cal">
                            <div className="cal_body">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    editable={false}
                                    contentHeight="auto"
                                    events = {[
                                        {date : '2021-10-05', backgroundColor: 'red', display:"background"}
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                    </Col>
    </Row>
  </Container>
                </div>
                 </div>
    )
}