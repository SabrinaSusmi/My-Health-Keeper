import "../../../static/Styling/addNotesModal.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import { useCookies } from "react-cookie";
import ViewNotesSection from "./ViewNotesSection";
import { Container } from "react-grid-system";
import { COLORS } from "../../themeColors";
import { ShowHeader } from "../../header/Header";
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




const AddNotesModal = ({demo,showNotesModal,setShowNotesModal}) => {
  
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [isViewEnabled, setisViewEnabled] = useState(true);
  const [cookies, setCookie] = useCookies(["user"]);
  const handleNotesShow = () => setisViewEnabled(false);
  const [initialData, setInitialData] = useState(initialState);
  const [menstrualNotesData, setmenstrualNotesData] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isNotesAvailable, setisNotesAvailable] = useState(false);
  const handleClose = () => setShowNotesModal(false);
  const [show, setShow] = useState();
  const {
    mood,
    symptoms,
    flow,
  } = initialData;
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
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={saveNotes}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
     

      <div className="reminder"
    style={{
      backgroundImage: "url(/img/mensNote.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "50vh",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
  }}>
       <Container  style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
       <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.menstrualnotesBackground)}
          </div>
         <pre></pre> 
          <pre></pre>

      <ViewNotesSection
        demo={demo}
        setisViewEnabled={setisViewEnabled}
        isViewEnabled={isViewEnabled}
        setShowNotesModal={setShowNotesModal}
      />
      </Container>
      </div>
    </div>
  );
};
export default AddNotesModal;