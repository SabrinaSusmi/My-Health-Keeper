import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import InvertColorsIcon from "@material-ui/icons/InvertColors";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";


const bpInitialState = {
    infoTitleBp: "Bp",
    infoBp: "",
    errB: "",
    successB: "",
  };

function BpInfo({ showBpInfo, setShowBpInfo}) {
   const token = useSelector((state) => state.token);
   const [bp, setBp] = useState(bpInitialState);

   const { infoTitleBp, infoBp, errB, successB } = bp;

   const handleChangeBp = (e) => {
    const { name, value } = e.target;
    setBp({ ...bp, [name]: value, errB: "", successB: "" });
  };

  const handleSubmitBp = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleBp;
    var info = infoBp;

    await axios
      .post(
        "http://localhost:5000/addGenHealth",
        {
          infoTitle,
          info,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        setBp({ ...bp, errB: "", successB: "BP added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setBp({ ...bp, errB: err.response.data.msg, successB: "" });
      });

    setTimeout(function () {
      setBp(bpInitialState);
    }, 3000);
  };
  

  return (
              <div data-toggle="tooltip">
                 {errB && showErrMsg(errB)}
                    {successB && showSuccessMsg(successB)}
                      <Typography component="h5" variant="h5">
                      🩸 Blood Pressure (systolic/diastolic)
                      </Typography> 
                          <InvertColorsIcon />
                          <TextField
                            label="120/80"
                            id="infoBp"
                            name="infoBp"
                            value={infoBp}
                            onChange={handleChangeBp}
                          />
                       <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitBp}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
               
              </div>
    
  );

}

export default BpInfo;