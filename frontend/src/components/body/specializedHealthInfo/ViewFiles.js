import React, { useState, useEffect, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Button, IconButton, Link, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles({
  root: {
    maxWidth: "100mvh",
  },
  media: {
    resizeMode: "contain",
    height: 180,
    width: 190,
  },
});

export default function AddFiles() {
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const [mediaFileType, setMediaFileType] = useState("");

  let history = useHistory();
  //   console.log("viewFiles ", folderid);

  const [mediaFiles, setMediaFiles] = useState([]);
  const { state } = useLocation();
  console.log("state1: ", state);
  const showMediaFiles = async () => {
    // console.log("id  ", user._id);

    console.log("state: ", state);
    const userid = user._id;

    await axios
      .get("http://localhost:5000/api/getFolderItems", {
        headers: { Authorization: token, folderid: state._id },
      })
      .then((res) => {
        console.log("    hghytcfh    ", res.data);
        setMediaFiles(res.data);
      });
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  
  useEffect(async () => {
    showMediaFiles();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <pre></pre>
      <div className="reminder_buttons">
        &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;
        <Link href="/medicine-reminder" className="reminder_buttons_sub">
          {""} ➕ Add New Files
        </Link>
      </div>
      <div>
        {" "}
        <h3 justify="center">{state.folder}</h3>
        <hr></hr>
      </div>
      {state.numberOfFiles==0?(<>NO Files Added 😢</>):(<div>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
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
                    <>
                      {" "}
                      {console.log(element.fileType)}
                      <img
                        className={classes.media}
                        component="img"
                        src={`http://localhost:5000/${element.filePath}`}
                        title="Contemplative Reptile"
                        alt="lpl"
                      />
                      <CardContent>
                        <h7>
                          <b>Name:</b> {element.fileName}
                        </h7>
                        <div >
                          <IconButton
                       className="viewBtn"      data-toggle="tooltip"
                            title="Delete this file"
                            // onClick={() => deleteReminder(medicines._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="react-pdf__Page__canvas">
                      <Document
                        file={`http://localhost:5000/${element.filePath}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                      {/* <p>Page {pageNumber} of {numPages}</p> */}
                      <CardContent>
                        <h7>
                          <b>Name:</b> {element.fileName}
                        </h7>
                        <div>
                          <IconButton
                           className="viewBtn"
                            data-toggle="tooltip"
                            title="Delete this file"
                            // onClick={() => deleteReminder(medicines._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </CardContent>
                    </div>
                  )}
                </div>
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
)}
    </div>
  );
}
