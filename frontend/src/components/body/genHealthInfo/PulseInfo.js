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


const pulseInitialState = {
    infoTitlePulse: "Pulse",
    infoPulse: "",
    errP: "",
    successP: "",
  };

function PulseInfo({ showPulseInfo, setShowPulseInfo}) {
   const token = useSelector((state) => state.token);
   const [pulse, setPulse] = useState(pulseInitialState);

   const { infoTitlePulse, infoPulse, errP, successP } = pulse;
   const handleChangePulse = (e) => {
    const { name, value } = e.target;
    setPulse({ ...pulse, [name]: value, err: "", success: "" });
  };

  const handleSubmitPulse = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitlePulse;
    var info = infoPulse;

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
        setPulse({ ...pulse, errP: "", successP: "Pulse added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setPulse({ ...pulse, errP: err.response.data.msg, successP: "" });
      });

    setTimeout(function () {
      setPulse(pulseInitialState);
    }, 3000);
  };
  

  return (
              <div data-toggle="tooltip">
                <Card>
                    <CardContent>
                    {errP && showErrMsg(errP)}
                    {successP && showSuccessMsg(successP)}
                      <Typography component="h5" variant="h5">
                      💓 Pulse Rate
                      </Typography> <pre></pre>
                          <InvertColorsIcon />
                          <TextField
                             label="bpm"
                             id="infoPulse"
                             name="infoPulse"
                             value={infoPulse}
                             onChange={handleChangePulse}
                          />
                       <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitPulse}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
                    </CardContent>
                </Card>
              </div>
    
  );

}

export default PulseInfo;