import React, { useState } from "react";

import "../../../static/Styling/addNotesModal.css";

const AddNotesModal = (props) => {
  if (!props.show) {
    return null;
  }

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