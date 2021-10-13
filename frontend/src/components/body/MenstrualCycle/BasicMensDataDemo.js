import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const initialState = {
  startdate: "",
  enddate: "",
  duration: "",
  cycleLength: "",
  err: "",
  success: "",
};

export default function ShowBasicMensData() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [initialData, setInitialData] = useState(initialState);
  const [visible, setVisible] = useState(true);

  const { startDate, endDate, duration, cycleLength, err, success } =
    initialData;
  const getInitialData = async () => {
    const id = auth.user._id;
    axios
      .get(`http://localhost:5000/user/is-initial-data-available`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const data1 = response.data.user;
        if(data1){
            setVisible(false)
        }
        console.log(data1)
        // localStorage.setItem("UserMenstrualInfo", data1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = user._id;
    let userEmail = user.email;

    try {
      const res = await axios.post(
        "http://localhost:5000/user/setup-initial-data",
        {
          startDate,
          endDate,
          duration,
          cycleLength,
          userEmail,
        },
        {
          headers: { Authorization: token, userid: id },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      //   localStorage.setItem("UserMenstrualInfo", id);
      //   handle(id);
      //   history.push("/menstrual-cycle");
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
      // console.log("nn ",err.response.data.msg)
    }
  };


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value, err: "", success: "" });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    // const id = user._id;
    // let userEmail = user.email;

    try {
      const res = await axios.patch(
        "http://localhost:5000/user/update-menstrual-data",
        {
          startDate,
          endDate,
        },
        {
          headers: { Authorization: token },
        }
      );

      setInitialData({ ...initialData, err: "", success: res.data.msg });
      console.log("nn ", res.data.msg);
      //   history.push("/menstrual-cycle");
    } catch (err) {
      err.response.data.msg &&
        setInitialData({
          ...initialData,
          err: err.response.data.msg,
          success: "",
        });
      // console.log("nn ",err.response.data.msg)
    }
  };

  const visibility = () => {
    if (visible) {
      console.log(visible);
      //  showDurationAndCycleLength()
      return (
        <>
          {
            <Grid container alignItems="center">
              <TextField
                className="input_fields"
                fullWidth
                type="number"
                required
                label="Duration of each cycle"
                id="duration"
                name="duration"
                placeholder="Duration"
                onChange={handleChangeInput}
                value={duration}
                variant="outlined"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            </Grid>
          }
          <hr></hr>
          {
            <Grid container alignItems="center">
              <TextField
                className="input_fields"
                fullWidth
                type="number"
                required
                label="Cycle Length"
                id="cycleLength"
                name="cycleLength"
                placeholder="Cycle Length"
                onChange={handleChangeInput}
                value={cycleLength}
                variant="outlined"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            </Grid>
          }
          <div></div>
          {
            <Button
              className="mens_button"
              variant="contained"
              onClick={handleSubmit}
              type={onsubmit}
            >
              Save Initial Information
            </Button>
          }
        </>
      );
    } else {
      //  showUpdateInitialButton()
      return (
        <>
          <div>
            {
              <Button
                className="mens_button"
                variant="contained"
                onClick={handleUpdate}
                type={onsubmit}
              >
                Update Previous Information
              </Button>
            }
          </div>
        </>
      );
    }
  };
  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <Grid container alignItems="center">
        <TextField
          className="input_fields"
          fullWidth
          required
          type="date"
          id="startDate"
          name="startDate"
          onChange={handleChangeInput}
          value={startDate}
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
        />
      </Grid>

      <hr></hr>
      {
        <Grid container alignItems="center">
          <TextField
            className="input_fields"
            fullWidth
            type="date"
            required
            id="endDate"
            name="endDate"
            onChange={handleChangeInput}
            value={endDate}
            variant="outlined"
            InputLabelProps={{
              shrink: false,
            }}
          />
        </Grid>
      }
      {visibility()}
    </>
  );
}
