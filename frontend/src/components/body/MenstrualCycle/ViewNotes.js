import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../static/Styling/menstrualCycle.css";
import { Button } from "@material-ui/core";
import { useCookies } from "react-cookie";


 const ViewNotes = ({demo,setisViewEnabled,setShowNotesModal,isViewEnabled}) => {

    
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const [cookies, setCookie] = useCookies(["user"]);
    const { user } = auth;
    const [isNotesAvailable, setisNotesAvailable] = useState(false);
    const [menstrualNotesData, setmenstrualNotesData] = useState([]);
    const handleClose = () => setShowNotesModal(false);
    const handleNotesShow = () => setisViewEnabled(false);

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


    return(
        <>
         
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

    )
}

export default ViewNotes;