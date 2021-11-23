
import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { useSelector } from "react-redux";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import axios from "axios";


const weightInitialState = {
  infoTitleWeight: "Weight",
  infoWeight: "",
  errW: "",
  successW: "",
};

function WeightInfo({ showWeightInfo, setShowWeightInfo}) {
   const token = useSelector((state) => state.token);
   const [weight, setWeight] = useState(weightInitialState);

  const { infoTitleWeight, infoWeight, errW, successW } = weight;
  const handleChangeWeight = (e) => {
    const { name, value } = e.target;
    setWeight({ ...weight, [name]: value, errW: "", successW: "" });
  };
  const handleSubmitWeight = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleWeight;
    var info = infoWeight;

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
      .then(() => {
        setWeight({
          ...weight,
          errW: "",
          successW: "Weight added successfully!",
        });
      })
      .catch((err) => {
        err.response.data.msg &&
          setWeight({ ...weight, errW: err.response.data.msg, successW: "" });
      });

    setTimeout(function () {
      setWeight(weightInitialState);
    }, 3000);
  };
  

  return (
              <div data-toggle="tooltip">
                <Card>
                    <CardContent>
                      {errW && showErrMsg(errW)}
                      {successW && showSuccessMsg(successW)}
                      <Typography component="h5" variant="h5">
                        👣 Weight
                      </Typography> <pre></pre>
                            <LocalHospitalRoundedIcon />
                            <TextField
                              label="KG"
                              id="infoWeight"
                              name="infoWeight"
                              value={infoWeight}
                              onChange={handleChangeWeight}
                            />
                            
                          <IconButton
                            aria-label="add"
                            className="controls"
                            onClick={handleSubmitWeight}
                          >
                            <AddCircleOutlineRoundedIcon className="playIcon" />
                          </IconButton>
                    </CardContent>
                </Card>
              </div>
    
  );

}

export default WeightInfo;