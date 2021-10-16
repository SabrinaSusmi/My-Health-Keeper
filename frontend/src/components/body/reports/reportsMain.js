import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import profile from "../../../static/Styling/profile.css";

function ReportsMain() {
    return (
        <div
        className="profile_image_div"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img
                className="profile_image"
                src={`http://localhost:5000/${avatar.filePath}`}
                alt="img"
            />
            {isHovered && (
                <>
                <h6 align="center"> Change Profile Image</h6>
                <input
                    type="file"
                    className="form-control"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                />
                </>
            )}
        </div>

    )

}

export default ReportsMain;
