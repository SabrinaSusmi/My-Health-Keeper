import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/menstrualCycle.css";
import "../../../static/Styling/mensDemo.css";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
import UserMenstrualCircleInfo from "./UserMenstrualCircleInfo";

const initialState = {
  err: "",
  success: "",
  eventDate: "",
  mood: "",
  symptoms: "",
  flow: "",
};

export default function MenstrualDemo() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [initialData, setInitialData] = useState(initialState);

  const [isNotesAvailable, setisNotesAvailable] = useState(false);

  const { err, success } = initialData;
  const [isViewEnabled, setisViewEnabled] = useState(false);

  useEffect(() => {
    // getInitialData();
  }, []);

  const [demo, setDemo] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);

  const Demo = (ar) => {
    setDemo(ar);
  };

  const handleDateClick = (arg) => {
    setShowNotesModal(true);
    Demo(arg.dateStr);
    setisViewEnabled(true);
  };

  return (
    <div>
      <div
        className="reminder"
        style={{
          backgroundImage: "url(/img/mens_pink.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
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
            {ShowHeader(COLORS.menstrualBackground)}
          </div>

          <Row className="body_feature_row">
            <Col style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              &nbsp;
              <div className="mens_header_content">
                <p>menstrual</p>
              </div>
              <div className="mens_calendar_body">
                <div className="mens_overlay"></div> {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <div className="mens">
                  <div className="mens_body">
                    <div className="mens_info">
                      {UserMenstrualCircleInfo()}

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
              </div>
            </Col>
            <Col
              className="body_feature_column"
              style={{ position: "fixed", marginTop: 100 }}
              sm={2}
            >
              {ShowFeatureButtons()}
            </Col>
          </Row>
          <AddNotesModal
            demo={demo}
            showNotesModal={showNotesModal}
            setShowNotesModal={setShowNotesModal}
            setisViewEnabled={setisViewEnabled}
            isViewEnabled={isViewEnabled}
          />
        </Container>
      </div>
    </div>
  );
}
