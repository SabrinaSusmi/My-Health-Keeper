import React, { useState, useEffect, useContext, useRef } from "react";
import "../../../static/Styling/spHealthInfo.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddNotes from "./AddNotes";
import { UserIDContext } from "../../../App";
import ViewFolderProps from "./ViewFolderProps";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import { Grid } from "@material-ui/core";

export default function SpecializedHealthInfo() {
  const [spHealthNotes, setSpHealthNotes] = useState([]);

  const userID = useContext(UserIDContext);
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  console.log("context userID ", userID);
  let history = useHistory();

  const showSPHealthNotes = async () => {
    let spID = localStorage.getItem("userID");

    console.log("sp id     ", spID);
    await axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: userID },
      })
      .then((res) => {
        // console.log(res.data);
        history.push("/specialized-health-information");
        setSpHealthNotes(res.data);
      });
  };

  useEffect(() => {
    showSPHealthNotes();
  }, []);

  const deleteFolder = async (folderId) => {
    await axios
      .delete("http://localhost:5000/api/deleteFolder/" + folderId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
      });
    const removedMed = [...spHealthNotes].filter((el) => el._id !== folderId);
    setSpHealthNotes(removedMed);
  };

  return (
    <div>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/sp4.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 0,
            maxWidth: 1900,
            padding: 0,
            marginRight: 0,
          }}
        >
          <div style={{ backgroundColor: "black", color: "black" }}>
            {ShowHeader(COLORS.spHealthBackground)}
          </div>
          <pre></pre>
          <pre></pre> <pre></pre> <pre></pre> <pre></pre>
          <pre></pre>
          <Row className="body_feature_row">
    
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="sp_header_content">
                <p>Welcome to the route for HEALTHY life!</p>
              </div>
              <div className="description_section">
                <div>
                  {/* <img src="../../../static/images/quote.png"/> */}
                  <p>No more forgetting <br></br> about bringing medical reports to doctors! <br></br> Now you can store all your MEDICAL reports and <br></br>prescriptions in <b>ONE PLACE</b>!! <br></br>Also keep track of your day to day life <br></br> health problems.</p>
                </div>
              </div>
              


              <Grid container>
                <Grid item xs={6}>
                  <AddNotes getNote={() => showSPHealthNotes()} />
                </Grid>
                <Grid item xs={6}>
                  <div className="sp_health_desc">
                    <p>No more forgetting about bringing medical reports to doctors. <br></br>Now you can store all your MEDICAL reports and prescriptions in <b>ONE PLACE</b>!!
                      <br></br>Also keep track of your day to day life health problems</p>
                  </div>
                </Grid>
              </Grid>

              <h2>&nbsp;&nbsp;&nbsp;Health Journal</h2>
              

              {spHealthNotes.length != 0 ? (
                <div className="sp_notes_card">
                  {spHealthNotes.map((note) => (
                    <ViewFolderProps
                      note={note}
                      deleteFolder={() => deleteFolder(note._id)}
                      showSPHealthNotes={() => showSPHealthNotes()}
                    />
                  ))}
                </div>
              ) : (
                <h2>No folder is created</h2>
              )}
            </Col>
            <Col
              className="body_feature_column"
              style={{ position: "fixed" }}
              sm={2}
            >
              {ShowFeatureButtons()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
