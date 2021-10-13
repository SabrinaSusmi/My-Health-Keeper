import React, { useState } from "react";

import "../../../static/Styling/addNotesModal.css";

const [menstrualNotesData, setmenstrualNotesData] = useState([]);
const AddNotesModal = (props) => {
  if (!props.show) {
    return null;
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
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


  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title"> Add Your Notes 📝 </h4>
        </div>
        <div className="modal-body">
          <form className="center">
            <div>
              <label for="date">Date : </label>
              <input type="date" name="date" />
            </div>

            <div>
              <label for="mood">Mood : </label>
              <input type="mood" name="mood" />
            </div>

            <div>
              <label for="symptoms">Symptoms : </label>
              <input type="symptoms" name="symptoms" />
            </div>

            <div>
              <label for="flow">Flow : </label>
              <input type="flow" name="flow" />
            </div>
            <div >
            </div>
          </form>
        </div>
        <div className="modal-footer">
        <button type="submit" style={{
          backgroundColor:'#4CAF50', 
          fontSize: '16px',}}
          >Save</button>
          <button className="button" style={{
            backgroundColor:'#555555',
            fontSize: '16px',
        }} onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddNotesModal;