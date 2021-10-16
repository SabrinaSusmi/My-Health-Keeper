import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Select, IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { TextField } from "@material-ui/core";

function GenHealthHistoryTable() {
    
  const token = useSelector((state) => state.token);
  const [healthInfo, setHealthInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [info, setInfo] = useState([]);

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

  const getMonthlyGenInfo = async (e) => {
    e.preventDefault();
    let sugarList = [];
    let weightList = [];
    let pulseList = [];
    let sysList=[]
    let diasList=[]
    e.preventDefault();
    await axios
      .get("http://localhost:5000/genHealthMonthlyHistory", {
        headers: { Authorization: token, year: year, months : selectedDate },
      })
      .then((res) => {
       res.sugar.forEach((element)=>{
        sugarList.push(element);
       })
       res.weight.forEach((element)=>{
        weightList.push(element);
       })
       res.pulse.forEach((element)=>{
        pulseList.push(element);
       })
       res.sys.forEach((element)=>{
        sysList.push(element);
       })
       res.dias.forEach((element)=>{
        diasList.push(element);
       })

      });
  };


  
  return (
    <div>
    <pre></pre>
      <pre></pre>
      <div style={{color:'#155844',marginLeft:'30%',  marginTop:'3%',fontSize:20,fontWeight:'bold'}}> 📅 Select Date for Viewing Your General Health Information Details For any specific Date</div>
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
      <hr></hr>
      <div className="food_table" style={{marginLeft:"10%",marginRight:"10%"}}>
        <div className="diet_info_item_progress"></div>
        <Table hover size="sm">
          <thead>
            <tr style={{ background: "transparent" }}>
              <th>Title</th>
              <th>Information Type </th>
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
                <td>{data.bpType}</td>
                <td>{data.info}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <pre></pre>
      <pre></pre>
      <div style={{backgroundColor:'#e8fbe8', height:"auto"}}>
      <pre></pre>
      
      <div style={{color:'#155844',marginLeft:'30%',  marginTop:'3%',fontSize:20,fontWeight:'bold'}}> 📅 View Your Monthly General Health Information Details</div>
      <div  style={{color:'#155844',marginLeft:'30%',  marginTop:'3%'}}>
                        <Select
                          // className={classes.formControl}
                          type="text"
                          id="selectedMonth"
                          name="selectedMonth"
                          className="month_progress_select"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="0">Select Month</option>
                          <option value={"1"}>January</option>
                          <option value={"2"}>February</option>
                          <option value={"3"}>March</option>
                          <option value={"4"}>April</option>
                          <option value={"5"}>May</option>
                          <option value={"6"}>June</option>
                          <option value={"7"}>July</option>
                          <option value={"8"}>August</option>
                          <option value={"9"}>September</option>
                          <option value={"10"}>October</option>
                          <option value={"11"}>November</option>
                          <option value={"12"}>December</option>
                        </Select>

                        <br></br>
                        <br></br>
                        <Select
                          // className={classes.formControl}
                          type="text"
                          id="selectedMonth"
                          name="selectedMonth"
                          className="year_progress_select"
                          // defaultValue={currentMonth}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          // padding="10px"
                          label="selectedMonth"
                        >
                          <option value="0">Select Year</option>
                          <option value={"2021"}>2021</option>
                          <option value={"2020"}>2020</option>
                          <option value={"2019"}>2019</option>
                          <option value={"2018"}>2018</option>
                          <option value={"2017"}>2017</option>
                          <option value={"2016"}>2016</option>
                          <option value={"2015"}>2015</option>
                          <option value={"2014"}>2014</option>
                          <option value={"2013"}>2013</option>
                          <option value={"2012"}>2012</option>
                          <option value={"2011"}>2011</option>
                        </Select>

                        <IconButton
                          onClick={(e) => getMonthlyGenInfo(e)}
                          style={{ padding: 0 }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </div>
          <div className="diet_info_item_progress"></div>
          <pre></pre>
          <pre></pre>
        <Table hover size="sm">
          <thead>
            <tr style={{ background: "transparent" }}>
              <th>Date</th>
              <th>Blood Pressure</th>
              <th>Weight</th>
              <th>Sugar level</th>
              <th>Pulse Rate</th>
            </tr>
          </thead>

          <tbody>
            {info.map((value, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{value.infoTitle}</td>
                <td>{value.bpType}</td>
                <td>{value.info}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div>
                      
   
  );
};
export default GenHealthHistoryTable;