import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";

import { ShowHeader } from "../../header/Header";
import { ShowFeatureButtons } from "../../header/featureButton";
// import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import featureButton from "../../../static/Styling/featureButton.css";
import { COLORS } from "../../themeColors";
import tipsImg from "../../../static/images/mens_tips.jpeg";
const MenstrualTips = () => {
  return (
    <>
     
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
          
          <Row className="body_feature_row">
          
          <img
                src={tipsImg}
                
              ></img>{" "}
              
            <Col
              className="body_feature_column"
              style={{ position: "fixed" }}
              sm={2}
            >
              <pre></pre>
              <pre></pre><pre></pre> <pre></pre> <pre></pre>
          <pre></pre>
              {ShowFeatureButtons()}
            </Col>
             </Row>
        </Container>
    
    </>
  );
};

export default MenstrualTips;
