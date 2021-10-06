import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spViewFiles.css";
import { useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ModalImage from "react-modal-image";
import LazyLoad from "react-lazyload";
import { Button, Grid, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PdfView from "./pdfView";
import Modal from "react-bootstrap/Modal";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from '../../../static/Styling/featureButton.css'
import { COLORS } from "../../themeColors";

const useStyles = makeStyles({
  root: {
    maxWidth: "100mvh",
  },
  media: {
    resizeMode: "contain",
    height: 225,
    width: 190,
  },
});

export default function AddFiles() {
  // const inputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  const [mediaFiles, setMediaFiles] = useState([]);
  const { state } = useLocation();

  const showMediaFiles = async (state) => {
    await axios
      .get("http://localhost:5000/api/getFolderItems", {
        headers: { Authorization: token, folderid: state._id },
      })
      .then((res) => {
        console.log("    hghytcfh    ", res.data);
        setMediaFiles(res.data);
      });
  };

  const [multipleFiles, setMultipleFiles] = useState("");
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };

  const folderName = state.folder;
  const fileLength = state.numberOfFiles;

  useEffect(async () => {
    showMediaFiles(state);
  }, []);

  const updateFiles = async () => {
    const formData = new FormData();
    console.log("swdxs", state.folder);

    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await axios
      .put("http://localhost:5000/api/updateMediaFiles", formData, {
        headers: { Authorization: token, folder: folderName },
      })
      .then((result) => {
        // history.push("/view-files");
        showMediaFiles(state);
        setMultipleFiles("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFile = async (filepath) => {
    await axios
      .delete("http://localhost:5000/api/deleteFiles/" + state.folder, {
        headers: { Authorization: token, filepath: filepath },
      })
      .then(showMediaFiles(state))
      .catch((err) => {
        console.log(err);
      });
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <Container  style={{display: 'flex', flexDirection: 'column' ,margin:0,maxWidth:1900,padding:0,marginRight:0}} >
    <div style={{backgroundColor:'black', color:'black'}} >{ShowHeader(COLORS.spHealthBackground)}</div>
    
    
    <pre></pre>
    <pre></pre> <pre></pre> <pre></pre> 
    
    <Row className='body_feature_row' >
      <Col className='body_feature_column' style={{ position:'fixed' }} sm={2}>
        
        {ShowFeatureButtons()}</Col>
      <Col style={{ marginLeft:150 ,display: 'flex', flexDirection: 'column'}}>
      <div className="heading">
        <Link
          className="return_to_spHealth"
          component={NavLink}
          to="/specialized-health-information"
        >
          <ArrowBackIcon /> Return
        </Link>
        <div className="spHealth_reminder_buttons">
          <div className="viewFiles_Btn">
            <Button className="viewFiles_addBtn" onClick={updateFiles} multiple>
              Save
            </Button>
            <input
              type="file"
              onChange={(e) => {
                MultipleFileChange(e);
              }}
              multiple
            ></input>
          </div>
        </div>
      </div>

      <h3>&nbsp; {folderName}</h3>
      <hr></hr>
      {fileLength == 0 ? (
        <>NO Files Added 😢</>
      ) : (
        <div>
          <Grid container spacing={1} direction="row">
            {mediaFiles.map((element) => (
              <div>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={mediaFiles.indexOf(element)}
                >
                  <div className="media_card">
                    {element.fileType != "application/pdf" ? (
                      <LazyLoad className="lazyload" key={element.fileName}>
                        <ModalImage
                          className={classes.media}
                          small={`http://localhost:5000/${element.filePath}`}
                          large={`http://localhost:5000/${element.filePath}`}
                          alt={element.fileName}
                          hideDownload={false}
                          hideZoom={false}
                        />
                        <h7>
                          <b>Name:</b> {element.fileName}
                        </h7>
                        <div className="media_file_delete">
                          <Button
                            className="media_file_delete_sub"
                            onClick={() => {
                              deleteFile(element.filePath);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </LazyLoad>
                    ) : (
                      <div className='pdf'
                        onClick={(e) => {
                          window.open(
                            `http://localhost:5000/${element.filePath}`,
                            "_blank"
                          );
                        }}
                      >
                        <LazyLoad className="lazyload" key={element.fileName}>
                          <PdfView getFilePath={element.filePath} />
                         <pre></pre>
                          <h7>
                            <b>Name:</b> {element.fileName}
                          </h7>
                          <div className="media_file_delete">
                            <Button
                              className="media_file_delete_sub"
                              onClick={() => {
                                deleteFile(element.filePath);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        </LazyLoad>
                      </div>
                    )}
                  </div>
                </Grid>
              </div>
            ))}
          </Grid>
        </div>
      )}

      
</Col>
    </Row>
  </Container>
    </div>
  );
}
