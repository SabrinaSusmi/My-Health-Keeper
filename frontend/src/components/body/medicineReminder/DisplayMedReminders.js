import React from "react";
import "../../../static/Styling/medicineReminder.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, IconButton, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MedModal from "./MedModal";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Modal from "react-modal";
function DisplayMedReminders() {
  const token = useSelector((state) => state.token);
  const [ongoingMedReminderList, setOngoingMedReminderList] = useState([]);
  const [doneMedReminderList, setDoneMedReminderList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [missedList, setMissedList] = useState([]);

  const showOngoingMedicineList = async () => {
    await axios
      .get("http://localhost:5000/CurrentMedReminder", {
        headers: { Authorization: token },
      })
      .then((res) => setOngoingMedReminderList(res.data));
  };

  const showCompleteMedicineList = async () => {
    await axios
      .get("http://localhost:5000/CompleteMedReminder", {
        headers: { Authorization: token },
      })
      .then((res) => setDoneMedReminderList(res.data));
  };

  useEffect(async () => {
    showOngoingMedicineList();
  }, []);

  useEffect(async () => {
    showCompleteMedicineList();
  }, []);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const getmissedMed = async (id) => {
    await axios
      .get("http://localhost:5000/medDoseMissed/" + id, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setMissedList(res.data);
        console.log(id);
      });
  };

  const deleteReminder = async (id) => {
    await axios
      .delete("http://localhost:5000/medReminder/delete/" + id, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });

    const removedMed = [...ongoingMedReminderList].filter(
      (el) => el._id !== id
    );
    setOngoingMedReminderList(removedMed);
  };
  return (
    <div className="reminder">
      {" "}
      &nbsp;
      <div className="reminder_buttons">
        <Link href="/medicine-reminder" className="reminder_buttons_sub">
          {""} Add New
        </Link>
        <Link href="/medicine-doses" className="reminder_buttons_sub">
          {""} Medicines Today
        </Link>
      </div>
      <div className="reminder_body">
        <div>
          <h2> &nbsp;Ongoing Medicine</h2> <hr></hr>
        </div>
        {ongoingMedReminderList.map((medicines) => (
          <div variant="outlined" className="reminder_card">
            <h2>{medicines.medname}</h2>
            <p>Description: {medicines.descriptionmed}</p>
            <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
            <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
            <IconButton
              className="btn"
              data-toggle="tooltip"
              title="View Your Missed Medicine"
              onClick={() => {
                openModal();
                getmissedMed(medicines._id);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <IconButton
              className="btn"
              data-toggle="tooltip"
              title="Delete the Medicine"
              onClick={() => deleteReminder(medicines._id)}
            >
              <DeleteIcon />
            </IconButton>
            <MedModal
              showModal={showModal}
              setShowModal={setShowModal}
              list={missedList}
            />
          </div>
        ))}

        <div>
          <h2> &nbsp;Done</h2> <hr></hr>
        </div>
        {doneMedReminderList.map((medicines) => (
          <div className="reminder_card">
            <h2>{medicines.medname}</h2>
            <p>Description: {medicines.descriptionmed}</p>
            <p>Starting Date: {medicines.startdate.substring(0, 10)}</p>
            <p>Ending Date: {medicines.enddate.substring(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayMedReminders;
