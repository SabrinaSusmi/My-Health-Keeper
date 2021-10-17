import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import profile from "../../../static/Styling/profile.css";
import {
    Button,
    TextField,
    IconButton,
    InputLabel,
    FormControl,
  } from "@material-ui/core";

const initialState = {
    err: "",
    success: "",
};

function ReportsMain() {
    const [avatar, setAvatar] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [data, setData] = useState(initialState);
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const { state } = useLocation();
    const { user } = auth;
    const [loading, setLoading] = useState(false);
    const { err, success } = data;
    // const showAvatar = async (state) => {
    //   await axios
    //     .get("http://localhost:5000/user/get_profile_image", {
    //       headers: { Authorization: token },
    //     })
    //     .then((res) => {
    //       setAvatar(res.data);
    //     });
    // };

    // useEffect(async () => {
    //   showAvatar(state);
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        let formData = new FormData();
      formData.append("file", file);

        setLoading(true);
        console.log("sxsxdasxds ", formData);
        await axios.post(
          "http://localhost:5000/reports",
          formData,
          {
            headers: { Authorization: token },
          }
        ).then((res) => {
            console.log("reports ", res);
            setAvatar(res.data)
          })
          .catch((err) => {
            console.log("err reports : ", err)
          });

        setLoading(false);
        
      };

    // const changeAvatar = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const file = e.target.files[0];

    //     if (!file)
    //       return setData({
    //         ...data,
    //         err: "No files were uploaded.",
    //         success: "",
    //       });

    //     if (file.size > 1024 * 1024)
    //       return setData({ ...data, err: "Size too large.", success: "" });

    //     if (file.type !== "image/jpeg" && file.type !== "image/png")
    //       return setData({
    //         ...data,
    //         err: "File format is incorrect.",
    //         success: "",
    //       });

    //     let formData = new FormData();
    //     formData.append("file", file);

    //     setLoading(true);
    //     console.log("sxsxdasxds ", formData);
    //     const res = await axios.post(
    //       "http://localhost:5000/user/set_profile_image",
    //       formData,
    //       {
    //         headers: { Authorization: token },
    //       }
    //     );

    //     setLoading(false);
    //     showAvatar();
    //   } catch (err) {
    //     setData({ ...data, err: err.response.data.msg, success: "" });
    //   }
    // };

    return (
      <div
        className="profile_image_div"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          <div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {loading && <h3>Loading.....</h3>}
        </div>
        {/* <img
          className="profile_image"
          src={`http://localhost:5000/${avatar.filePath}`}
          alt="img"
        /> */}
        <h6 align="center"> Change Profile Image</h6>
            <input
              type="file"
              className="form-control"
              name="file"
              id="file_up"
            //   onChange={changeAvatar}
            />

        <div className="add_btn_diet">
        <Button
          type="submit"
          className="add_btn"
          variant="contained"
          onClick={handleSubmit}
          color="white"
        >
          <font className="add_btn_diet_font"> predict</font>
        </Button>
      </div>
      </div>
      
    );

}

export default ReportsMain;
