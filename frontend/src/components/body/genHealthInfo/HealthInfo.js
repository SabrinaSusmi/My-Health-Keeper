import "../../../static/Styling/healthInfo.css";
import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HeightIcon from "@material-ui/icons/Height";
import { Button } from "@material-ui/core";
import WeightModal from "./WeightModal";
import BpModal from "./BpModal";
import SugarModal from "./SugarModal";
import PulseModal from "./PulseModal";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import axios from "axios";

const weightInitialState = {
  infoTitleWeight: 'Weight',
  infoWeight: '',
  errW: '',
  successW: ''
}

const bpInitialState = {
  infoTitleBp: 'Bp',
  infoBp: '',
  errB: '',
  successB: ''
}

const pulseInitialState = {
  infoTitlePulse: 'Pulse',
  infoPulse: '',
  errP: '',
  successP: ''
}

const sugarInitialState = {
  infoTitleSugar: 'Sugar',
  infoSugar: '',
  errS: '',
  successS: ''
}


function GeneralHealthInfo() {
  const token = useSelector((state) => state.token);

  const [showWeightModal, setShowWeightModal] = useState(false);
  const openWeightModal = () => setShowWeightModal(true);

  const [showBpModal, setShowBpModal] = useState(false);
  const openBpModal = () => setShowBpModal(true);

  const [showPulseModal, setShowPulseModal] = useState(false);
  const openPulseModal = () => setShowPulseModal(true);
 
  const [showSugarModal, setShowSugarModal] = useState(false);
  const openSugarModal = () =>  setShowSugarModal(true);

  const [weight, setWeight] = useState(weightInitialState);
  const [bp, setBp] = useState(bpInitialState);
  const [pulse, setPulse] = useState(pulseInitialState);
  const [sugar, setSugar] = useState(sugarInitialState);

  const { infoTitleWeight, infoWeight, errW, successW } = weight;
  const { infoTitleBp, infoBp, errB, successB } = bp;
  const { infoTitlePulse, infoPulse, errP, successP } = pulse;
  const { infoTitleSugar, infoSugar, errS, successS } = sugar;


  const handleChangeWeight = (e) => {
    const { name, value } = e.target;
    setWeight({ ...weight, [name]: value, err: "", success: "" });
  };

  const handleChangeBp = (e) => {
    const { name, value } = e.target;
    setBp({ ...bp, [name]: value, err: "", success: "" });
  };

  const handleChangePulse = (e) => {
    const { name, value } = e.target;
    setPulse({ ...pulse, [name]: value, err: "", success: "" });
  };

  const handleChangeSugar = (e) => {
    const { name, value } = e.target;
    setSugar({ ...sugar, [name]: value, err: "", success: "" });
  };

  const handleSubmitWeight = async (e) => {
    e.preventDefault();
    var infoTitle = infoTitleWeight;
    var info = infoWeight;

    await axios.post("http://localhost:5000/addGenHealth", {
      infoTitle,
      info,
    }, {
      headers: { Authorization: token },
    }).then((res)=> {
      setWeight({ ...weight, errW: "", successW:"Height added successfully!" });
    }).catch ((err) => {
      err.response.data.msg && setWeight({ ...weight, errW: err.response.data.msg, successW:"" });
    })
  };


  return (
    <div className=" body ">
      {
        <div>
        <Card className="root">
          <div className="details">
            <CardContent className="content">
              <Typography component="h5" variant="h5">
                👣 Weight
              </Typography>
              <div className="margin">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <LocalHospitalRoundedIcon />
                  </Grid>
                  <Grid item>
                    <TextField label="KG" id="infoWeight" name="infoWeight" value={infoWeight} onChange={handleChangeWeight} />
                  </Grid>
                  <IconButton aria-label="add" className="controls" onClick= {handleSubmitWeight}>
                    <AddCircleOutlineRoundedIcon className="playIcon" />
                  </IconButton>
                </Grid>
              </div>
              <Button className="summary_btn" onClick={openWeightModal}>
                 Show History</Button>
            </CardContent>
          </div>
          <WeightModal
        showWeightModal={showWeightModal}
        setShowWeightModal={setShowWeightModal}
      />
        </Card>
      </div>
      }
      {
        <Card className="root">
          <div className="details">
            <CardContent className="content">
              <Typography component="h5" variant="h5">
                🩸 Blood Pressure
              </Typography>
              <div className="margin">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <InvertColorsIcon />
                  </Grid>
                  <Grid item>
                    <TextField label="bpm" />
                  </Grid>
                  <IconButton aria-label="add" className="controls">
                    <AddCircleOutlineRoundedIcon className="playIcon" />
                  </IconButton>
                </Grid>
              </div>
              <Button className="summary_btn" onClick={openBpModal}> Show History</Button>
            </CardContent>
          </div>
         <BpModal
         showBpModal={showBpModal}
         setShowBpModal={setShowBpModal}>
         </BpModal>
        </Card>
      }
      {
        <Card className="root">
          <div className="details">
            <CardContent className="content">
              <Typography component="h5" variant="h5">
                💓 Pulse Rate
              </Typography>
              <div className="margin">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <FavoriteBorderIcon />
                  </Grid>
                  <Grid item>
                    <TextField label="bpm" />
                  </Grid>
                  <IconButton aria-label="add" className="controls">
                    <AddCircleOutlineRoundedIcon className="playIcon" />
                  </IconButton>
                 </Grid>
              </div>
              <Button className="summary_btn" onClick={openPulseModal}> Show History</Button>
            </CardContent>
          </div>
          <PulseModal
         showPulseModal={showPulseModal}
         setShowPulseModal={setShowPulseModal}>
         </PulseModal>
        </Card>
      }
      {
         <Card className="root">
         <div className="details">
           <CardContent className="content">
             <Typography component="h5" variant="h5">
               🎚 Sugar Level
             </Typography>
             <div className="margin">
               <Grid container spacing={2} alignItems="flex-end">
                 <Grid item>
                   < HeightIcon />
                 </Grid>
                 <Grid item>
                   <TextField label=" " />
                 </Grid>
                 <IconButton aria-label="add" className="controls">
                   <AddCircleOutlineRoundedIcon className="playIcon" />
                 </IconButton>
                </Grid>
             </div>
             <Button className="summary_btn" onClick={openSugarModal}> Show History</Button>
           </CardContent>
         </div>
         <SugarModal
         showSugarModal={showSugarModal}
         setShowSugarModal={setShowSugarModal}>
         </SugarModal>
       </Card>
      }
    </div>
  );
}

export default GeneralHealthInfo;
