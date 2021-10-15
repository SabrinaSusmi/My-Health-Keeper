import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import axios from "axios";
import { TextField } from "@material-ui/core";

export default function GenHealthHistoryTable() {
  const token = useSelector((state) => state.token);
  const [healthInfo, setHealthInfo] = useState([]);

  const getHealthDetailsTable = async (e) => {
    e.preventDefault();
    const historyDate = e.target.value;
   

    await axios
      .get("http://localhost:5000/genHealthHistory", {
        headers: { Authorization: token, dates: historyDate },
      })
      .then((res) => {
        setHealthInfo(res.data);
      });
  };
  
  return (
    <div>
    <pre></pre>
      <pre></pre>
      <div style={{color:'#155844',marginLeft:'30%',  marginTop:'3%',fontSize:20,fontWeight:'bold'}}> 📅 Select Date for Viewing Your General Health Information Details </div>
      <TextField
        style={{color:'#155844',marginLeft:'30%',  marginTop:'3%'}}
        variant="outlined"
        required
        id="startdate"
        name="startdate"
        onChange={getHealthDetailsTable}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <div className="food_table">
        <div className="diet_info_item_progress"></div>
        <Table hover size="sm">
          <thead>
            <tr style={{ background: "transparent" }}>
              <th>Title</th>
              <th>Information / Data</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {healthInfo.map((data, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{data.infoTitle}</td>
                <td>{data.info}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}