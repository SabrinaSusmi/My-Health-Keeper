import React from "react";
//import "./medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IconButton, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import MedProps from "./MedProps";

const initialState = {
  meds: [],
};



function DisplayMedicineReminders() {
  //const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const [reminderList, setReminderList] = useState([]);

  //const {meds} = reminderList;

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/medReminder", {
        headers: { Authorization: token },
      })
      .then((res) => {
        //console.log(res.data);
        setReminderList(res.data);
      })
      .catch((error) => {
        console.log("Test :" + error);
      });
  }, []);

  //console.log(reminderList);

  const medList = () => {
    return reminderList.map((currentmedicine) => {
      //console.log(currentmedicine);
      return <MedProps medicine={currentmedicine} />;
    });
  };

  return (
    <div className="reminder">
      <div className="reminder_header">
        <h1>Reminder List 🧭</h1>
        <Link href="/medicine-reminder" className="button">
          {" "}
          Add to List
        </Link>
      </div>

      {/* <IconButton onClick={medList}>
                  <AddIcon />
                </IconButton> */}

      <div>
        <h2>hello</h2>
        {reminderList.map((currentmedicine) => {
          console.log(currentmedicine);
          <div className="reminder_card" key={currentmedicine._id}>
            <h2>{currentmedicine.medname}</h2>
            <p>{currentmedicine.descriptionmed}</p>
            <p>Start Date : {currentmedicine.startdate.substring(0, 10)}</p>
            <p>End Date : {currentmedicine.enddate.substring(0, 10)}</p>
          </div>;
        })}
      </div>

      {/* <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{reminderList.map((currentmedicine) => {
          <Medicine medicine={currentmedicine} key={currentmedicine._id} />
      })}</tbody>
      </table> */}
    </div>
  );
}

export default DisplayMedicineReminders;
