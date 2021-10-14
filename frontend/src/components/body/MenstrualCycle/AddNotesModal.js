import "../../../static/Styling/addNotesModal.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import { useCookies } from "react-cookie";
import ViewNotesSection from "./ViewNotesSection";
import { Container } from "react-grid-system";
import { COLORS } from "../../themeColors";
import { ShowHeader } from "../../header/Header";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

const AddNotesModal = ({
  demo,
  showNotesModal,
  setShowNotesModal,
  setisViewEnabled,
  isViewEnabled,
}) => {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [cookies, setCookie] = useCookies(["user"]);
  const [initialData, setInitialData] = useState(initialState);
  const [menstrualNotesData, setmenstrualNotesData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isNotesAvailable, setisNotesAvailable] = useState(false);
  const handleClose = () => setShowNotesModal(false);
  const [show, setShow] = useState();
  const { mood, symptoms, flow } = initialData;
  let history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };
  const getInitialData = async () => {
    if (localStorage.getItem("UserMenstrualInfo")) {
      console.log("sxsx  ", cookies.UserMenstrualInfo);
      setVisible(false);
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);

  const saveNotes = async () => {
    const id = user._id;
    try {
      const res = await axios.post(
        "http://localhost:5000/user/cycleTracker-notes",
        {
          eventDate: demo,
          mood,
          symptoms,
          flow,
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setTimeout(function () {
        setInitialData(initialData);
      }, 10);
      console.log("nn ", res.data.msg);
      history.push("/menstrual-cycle_demo");
      handleClose(true);
      alert("Notes Added");
    } catch (err) {
      err.response.data.msg &&
        setTimeout(function () {
          setInitialData(initialData);
        }, 10);
    }
  };

  const viewNotes = async (e) => {
    e.preventDefault();
    // const id = user._id;
    await axios
      .get("http://localhost:5000/user/cycleTracker-display-notes", {
        headers: { Authorization: token,  dates: demo },
      })
      .then((response) => {
        setmenstrualNotesData(response.data);
        console.log(typeof response.data);
        if (!response.data.length == 0) {
          setisNotesAvailable(true);
        } else {
          setisNotesAvailable(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(demo);
    handleClose();
    if (isViewEnabled) {
      setisViewEnabled(false);
    } else setisViewEnabled(true);
  };

  return (
    <div>
      <Modal
        size="xxl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNotesModal}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>📝 Your Period Journal </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: 18 }}>
           
            <TextField
            style={{marginLeft:'56%'}}
              
              required
              type="date"
              // id="startDate"
              name="eventDate"
              value={demo}
              onChange={handleChangeInput}
              variant="standard"
              InputLabelProps={{
                shrink: false,
              }}
            />
          </div>
          <h6 className="add_notes_style">How's your mood?</h6>
          <div className="add_notes_style">
            <TextareaAutosize
              style={{ width: 400 }}
              type="mood"
              value={mood}
              onChange={handleChangeInput}
              name="mood"
            />
          </div>
          <pre></pre>
          <h6 className="add_notes_style">Do you feel any Discomfort?</h6>
          <div className="add_notes_style">
            <TextareaAutosize
              style={{ width: 400 }}
              rows="2"
              type="symptoms"
              value={symptoms}
              onChange={handleChangeInput}
              name="symptoms"
            />
          </div>

          <pre></pre>
          <h6 className="add_notes_style">What about flow?</h6>
          <div className="add_notes_style">
            <TextareaAutosize
              style={{ width: 400 }}
              type="flow"
              value={flow}
              onChange={handleChangeInput}
              name="flow"
            />
          </div>
          
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" type="submit" onClick={saveNotes}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="reminder"
        style={{
          backgroundImage: "url(/img/mensNote3.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "80vh",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
            backgroundPosition: "center",
            backgroundColor: "#FB8DA0",
            marginLeft: "35%",
            marginRight: "50%",
          }}
        >
          <Button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={viewNotes}
          >
            View Your Notes on the date Clicked? 🗃{" "}
          </Button>
        </div>
        <ViewNotesSection
          demo={demo}
          setisViewEnabled={setisViewEnabled}
          isViewEnabled={isViewEnabled}
          isNotesAvailable={isNotesAvailable}
          menstrualNotesData={menstrualNotesData}
          setmenstrualNotesData={setmenstrualNotesData}
        />
      </div>
    </div>
  );
};
export default AddNotesModal;
