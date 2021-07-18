import React from "react";
// import { sidebar } from '../../header/Sidebar'
import "../../../static/Styling/home.css";
import { Container } from "@material-ui/core";

function Home() {
  return (
    <div>
      <div
        class="bg_image"
        style={{
          backgroundImage: "url(/img/home-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          opacity: " 0.8",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4> Your Health, Our Concern</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
