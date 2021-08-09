import React, { useState, useEffect, useContext, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddNotes from "./AddNotes";
import { UserIDContext } from "../../../App";
import ViewFolderProps from "./ViewFolderProps";

export default function SpecializedHealthInfo() {
  const [spHealthNotes, setSpHealthNotes] = useState([]);

  const userID = useContext(UserIDContext);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  console.log("context userID ", userID);
  let history = useHistory();

  const showSPHealthNotes = async () => {
    let spID = localStorage.getItem("userID");

    console.log("sp id     ", spID);
    await axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: userID },
      })
      .then((res) => {
        // console.log(res.data);
        history.push("/specialized-health-information");
        setSpHealthNotes(res.data);
      });
  };

  useEffect(() => {
    showSPHealthNotes();
  }, []);

  const deleteFolder = async (folderId) => {
    await axios
      .delete("http://localhost:5000/api/deleteFolder/" + folderId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });
    const removedMed = [...spHealthNotes].filter((el) => el._id !== folderId);
    setSpHealthNotes(removedMed);
  };

  return (
    <div>
      <AddNotes getNote={() => showSPHealthNotes()} />
    
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health Diary</h4>
      <hr></hr>
      
      
      {spHealthNotes.length != 0 ? (
        <div>
          {spHealthNotes.map((note) => (
            <ViewFolderProps
              note={note}
              deleteFolder={() => deleteFolder(note._id)}
              showSPHealthNotes={() => showSPHealthNotes()}
            />
          ))}
        </div>
      ) : (
        <h2>No folder is created</h2>
      )}
    </div>
  );
}
