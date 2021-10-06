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

export default function MenstrualDemo(){
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    //const calStyle ={height: 100%}
    const btnstyle={margin:'8px 0'}
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
                >
                    <div className="mens">
                    <div className="mens_body">
                        <div className="mens_info">
                            <div className="info_item">
                                <p>17 days since last period.</p>
                            </div>
                            <div className="info_item">
                                <p>The last cycle was 28 days long.</p>
                            </div>
                            {/* <div className="info_item">
                                <p>Want to know about your period?</p>
                            </div> */}
                        </div>
                        <div className="mens_input">
                            <div className="input_form">
                                <Grid align='center'>
                                    <h2>Sign In</h2>
                                </Grid>
                                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                                
                                <Button className="mens_button" type='submit' color='primary' variant="contained">Sign in</Button>
                                
                            </div>
                        </div>
                        <div className="mens_cal">
                            <div className="cal_body">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    editable={false}
                                    
                                />
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
        </div>
    )
}