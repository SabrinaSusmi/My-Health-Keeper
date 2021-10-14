import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import { useCookies } from "react-cookie";

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


import "../../../static/Styling/addNotesModal.css";

const AddNotesModal = ({demo,isViewEnabled}) => {
  
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [cookies, setCookie] = useCookies(["user"]);
  const handleNotesShow = () => setisViewEnabled(false);
  const [initialData, setInitialData] = useState(initialState);
  const [menstrualNotesData, setmenstrualNotesData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isNotesAvailable, setisNotesAvailable] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
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
  let history = useHistory();
  


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };
  const handle = (id) => {
    setCookie("UserMenstrualInfo", id, { path: "/menstrual-cycle" });
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

  const calendarVisibility = () => {
    if (!visible) {
      return (
        <>
          <div className="H2">
            <h2>
              {" "}
              <i> Tracking Period At a glance with Notes 📝 </i>{" "}
            </h2>
          </div>
          {isViewEnabled ? (
            <div className="notes_body">
              <h4>
                Notes on <b>{demo}</b>
              </h4>
              {" "}
              {isNotesAvailable ? (
                <div className="notes_data">
                  {menstrualNotesData.map((note) => (
                      <div className="notes_card">
                        <p>Flow: {note.flow}</p>
                        <p>Mood: {note.mood}</p>
                        <p>Symptoms: {note.symptoms}</p>
                      
                    </div>
                  ))}
                </div>
              ) : (
             <h5> No notes are added </h5>          )}

              <Button className="notesButton" onClick={handleNotesShow}>
                Hide Your Notes
              </Button>
            </div>
          ) : (
            " "
          )}

        </>
      );
    }
  };

  const viewNotes = async (e) => {
    e.preventDefault();
    const id = user._id;
    await axios
      .get("http://localhost:5000/user/cycleTracker-display-notes", {
        headers: { Authorization: token, userid: id, dates: demo },
      })
      .then((response) => {
        setmenstrualNotesData(response.data);
        console.log(typeof(response.data))
        if (!(response.data).length==0) {
          setisNotesAvailable(true);    
        } else setisNotesAvailable(false)
     
       
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

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      history.push("/menstrual-cycle");
      handleClose(true);
      // alert("Notes Added");
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
    }
  };



  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>📝 Add Notes </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="center">
            <div>
              <label for="date">Date : </label>
              <input
                type="date"
                value={demo}
                onChange={handleChangeInput}
                name="eventDate"
              />
            </div>
            <div>
              <label for="mood">Mood : </label>
              <input
                type="mood"
                value={mood}
                onChange={handleChangeInput}
                name="mood"
              />
            </div>
            <div>
              <label for="symptoms">Symptoms : </label>
              <input
                type="symptoms"
                value={symptoms}
                onChange={handleChangeInput}
                name="symptoms"
              />
            </div>
            <div>
              <label for="flow">Flow : </label>
              <input
                type="flow"
                value={flow}
                onChange={handleChangeInput}
                name="flow"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={viewNotes}> View Notes</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={saveNotes}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};
export default AddNotesModal;