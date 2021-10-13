import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/menstrualCycle.css";
import "../../../static/Styling/mensDemo.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddNotesModal from "./AddNotesModal";
import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import ShowBasicMensData from "./BasicMensDataDemo";
const initialState = {
  err: "",
  success: "",
  eventDate: "",
  mood: "",
  symptoms: "",
  flow: "",
};

export default function MenstrualDemo() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [initialData, setInitialData] = useState(initialState);
  const [menstrualNotesData, setmenstrualNotesData] = useState([]);
  const [isNotesAvailable, setisNotesAvailable] = useState(false);

  let history = useHistory();

  const { err, success, eventDate, mood, symptoms, flow } = initialData;

  const [addModalShow, setNotesModal] = useState(false);
  const handleNotesClose = () => setNotesModal(false);
  const handleNotesShow = () => setisViewEnabled(false);
  const [isViewEnabled, setisViewEnabled] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };

  useEffect(() => {
    // getInitialData();
  }, []);

  const [show, setShow] = useState(false);
  const [demo, setDemo] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Demo = (ar) => {
    setDemo(ar);
  };

  const handleDateClick = (arg) => {
    // e.preventDefault();
    handleShow(true);
    Demo(arg.dateStr);
    setisViewEnabled(false);
  };

  return (
    <div>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/mens_pink.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
          opacity: " 0.8",
          backgroundPosition: "center",
        }}
      >
        {" "}
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
            {ShowHeader(COLORS.spHealthBackground)}
          </div>
          <pre></pre> <pre></pre> <pre></pre>
          <pre></pre>
          <Row className="body_feature_row">
            <Col
              className="body_feature_column"
              style={{ position: "fixed" }}
              sm={2}
            >
              <pre></pre>
              <pre></pre>
              {ShowFeatureButtons()}
            </Col>
            <Col
              style={{
                marginLeft: 120,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
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
                    <hr></hr>
                    {ShowBasicMensData()}
                  </div>
                  <div className="mens_cal">
                    <div className="cal_body">
                      <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        editable={false}
                        dateClick={handleDateClick}
                        contentHeight="auto"
                        events={[
                          {
                            date: "2021-10-05",
                            backgroundColor: "red",
                            display: "background",
                          },
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
      <AddNotesModal
        demo={demo}
        handleShow={true}
        setisViewEnabled={isViewEnabled}
      />
    </div>
  );
}
