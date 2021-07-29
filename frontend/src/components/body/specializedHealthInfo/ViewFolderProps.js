import React, { useState, useEffect, useContext, useRef } from "react";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import {
  IconButton,
  CardContent,
  Button,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import EditNotesModal from "./EditNotesModal";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "../../../static/Styling/spHealthInfo.css";

const useStyles = makeStyles((theme) => ({
  expand: {
    // transform: "rotate(0deg)",
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function ViewFolderProps(props) {
  const token = useSelector((state) => state.token);

  const [editing, setEditing] = useState(false);
  const [description, setDesc] = useState("");
  const [expanded, setExpanded] = React.useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const openSpEditModal = () => setShowEditModal(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  const updateDesc = async (e, folderId) => {
    e.preventDefault();
    console.log("folderId ", folderId);
    await axios
      .patch(
        "http://localhost:5000/api/updateSpecializedHealthInfo/" + folderId,
        { description },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        console.log("editfolder", response.data);
        setEditing(false);
        props.showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div variant="outlined" className="sp_reminder_card">
      <h2 className="folderName">
        <FolderSpecialIcon />
        &nbsp;{props.note.folder}
      </h2>
      <hr></hr>
      <div>Note Date: {props.note.noteDate.substring(0, 10)}</div>

      <IconButton
        className={
          (clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          }),
          "SPiconBtn")
        }
        onClick={handleExpandClick}
        aria-expanded={expanded}
      >
        <h5
          className="clrDiv"
          data-toggle="tooltip"
          title="Click To View Details"
        >
          Description
        </h5>
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{props.note.description}</CardContent>
      </Collapse>

      {editing ? (
        <CardContent className="content">
          {" "}
          <textarea
            className="editingBox"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          >
            {props.note.description}
          </textarea>
        </CardContent>
      ) : (
        ""
      )}

      <CardActions className="clrCardAction">
     
          <IconButton
            className="viewBtn"
            data-toggle="tooltip"
            title="Edit Folder"
            key={props.note.folder}
            value={props.note.description}
            // onClick={() => setEditing(true)}
            onClick={openSpEditModal}
          >
            <EditIcon />
          </IconButton>
      

        <IconButton
          component={Link}
          to={{
            state: props.note,
            pathname: "/view-files",
          }}
          className="viewBtn"
          data-toggle="tooltip"
          title="View Your Saved Files"
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          className="viewBtn"
          data-toggle="tooltip"
          title="Delete this Folder"
          onClick={() => props.deleteFolder()}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <EditNotesModal
                    key={props.note.folder}
                      showEditModal={showEditModal}
                      setShowEditModal={setShowEditModal}
                      getNote={props.note.description}
                      getID={props.note._id}
                      showSPHealthNotes= {props.showSPHealthNotes}   />
    </div>
  );
}
