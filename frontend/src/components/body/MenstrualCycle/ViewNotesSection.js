import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import { useCookies } from "react-cookie";


 const ViewNotesSection = ({demo,setisViewEnabled,isViewEnabled,isNotesAvailable,menstrualNotesData}) => {

    
    const auth = useSelector((state) => state.auth);
    const [cookies, setCookie] = useCookies(["user"]);
    const { user } = auth;
    

   

    return(
      <>
      <div>
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
          <h5> No notes are added </h5> )}
         </div>
       ) : (
         <h6>No notes are Viewed Right Now 😊</h6>
       )}
        </div>
     </>

    )
}

export default  ViewNotesSection;