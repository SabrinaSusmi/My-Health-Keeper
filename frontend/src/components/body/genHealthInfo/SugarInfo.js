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


const sugarInitialState = {
    infoTitleSugar: "Sugar",
    infoSugar: "",
    errS: "",
    successS: "",
  };

function SugarInfo({ showSugarInfo, setShowSugarInfo}) {
   const token = useSelector((state) => state.token);
   const [sugar, setSugar] = useState(sugarInitialState);

   const { infoTitleSugar, infoSugar, errS, successS } = sugar;
   const handleChangeSugar = (e) => {
    const { name, value } = e.target;
    setSugar({ ...sugar, [name]: value, err: "", success: "" });
  };

  const handleSubmitSugar = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleSugar;
    var info = infoSugar;

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
        setSugar({ ...sugar, errS: "", successS: "Sugar added successfully!" });
      })
      .catch((err) => {
        err.response.data.msg &&
          setSugar({ ...sugar, errS: err.response.data.msg, successS: "" });
      });

    setTimeout(function () {
      setSugar(sugarInitialState);
    }, 3000);
  };
  

  return (
              <div data-toggle="tooltip">
                <Card>
                    <CardContent>
                    {errS && showErrMsg(errS)}
                    {successS && showSuccessMsg(successS)}
                      <Typography component="h5" variant="h5">
                      🎚 Sugar Level
                      </Typography> <pre></pre>
                          <InvertColorsIcon />
                          <TextField
                             label=" "
                             id="infoSugar"
                             name="infoSugar"
                             value={infoSugar}
                             onChange={handleChangeSugar}
                          />
                       <IconButton
                          aria-label="add"
                          className="controls"
                          onClick={handleSubmitSugar}
                        >
                          <AddCircleOutlineRoundedIcon className="playIcon" />
                        </IconButton>
                    </CardContent>
                </Card>
              </div>
    
  );

}

export default SugarInfo;