import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import profile from "../../../static/Styling/profile.css";

import { FormControl, Select, InputLabel, makeStyles } from "@material-ui/core";

const initialState = {
  name: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  // const users = useSelector(state => state.users)

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const { name, phone, gender, err, success } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const [accountUpdated, setAccountUpdated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
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

  //     if (file.size > 10 * 1024 * 1024)
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
  //     const res = await axios.post("/api/upload_avatar", formData, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //         Authorization: token,
  //       },
  //     });

  //     setLoading(false);
  //     setAvatar(res.data.url);
  //   } catch (err) {
  //     setData({ ...data, err: err.response.data.msg, success: "" });
  //   }
  // };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          gender: gender ? gender : user.gender,
          phone: phone ? phone : user.phone,
         
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar || phone || gender) updateInfor();
    // console.log(gender)
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 300,
      background: "rgb(223, 221, 221)",
    },
    position: {
      paddingTop: "45%",
    },
    button:{
      // width: '20%',
      // backgroundColor: '#063742',
      // color: 'white',
      // display: 'inline',
      paddingTop:'8%',
      paddingLeft:'33%'},
  }));

  const classes = useStyles();

  return (
    <>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
      <div className="profile_page">
        <div className="col-left">
          {/* <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
                </div>
                {loading && <h3>Loading.....</h3>} */}
          <div className={classes.position}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user.name}
                placeholder="Your name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user.email}
                placeholder="Your email address"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                defaultValue={user.phone}
                placeholder="Contact Number"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <Select
                className={classes.formControl}
                typr="text"
                id="gender"
                name="gender"
                onChange={handleChange}
                defaultValue={user.gender}
                value={gender}
                padding="10px"
                label="Gender"
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Others"}>Others</option>
              </Select>
            </div>
            <div className={classes.button}>
            <button  onClick={handleUpdate}>
              Update
            </button>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
