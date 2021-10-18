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
  const [sugarList, setsugarList] = useState([]);
  const [weightList, setweightList] = useState([]);
  const [diasList, setdiasList] = useState([]);
  const [pulseList, setpulseList] = useState([]);
  const [sysList, setsysList] = useState([]);
  const [dateList, setdateList] = useState([[]]);

  const token = useSelector((state) => state.token);
  const [healthInfo, setHealthInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [info, setInfo] = useState([]);
  console.log("susy ", dateList);

  const getMonthlyGenInfo = async (e) => {
    e.preventDefault();
    let sugarLists = [];
    let pulseLists = [];
    let weightLists=[]
    let sysLists = [];
    let diasLists = [];
    let datelists = [];
    await axios
      .get("http://localhost:5000/genHealthMonthlyHistory", {
        headers: { Authorization: token, months: selectedDate, year: year },
      })
      .then((res) => {
        console.log(res.data);
        // let suga=[]
//         for (let i = 0; i < res.data.date.length; i++) {
// let          suga=[]
   
//           suga['sugar']=(res.data.sugar[i]);
//           suga['weight']=(res.data.weight[i]);
//           sugarLists.push(res.data.sugar[i]);
//           sugarLists.push(res.data.weight[i]);
//           sugarLists.push(res.data.pulse[i]);
//           sugarLists.push(res.data.sys[i]);
//           sugarLists.push(res.data.dias[i]);
//           sugarLists.push(res.data.date[i]);
//           console.log(suga)
//           setdateList(suga)
//         }
//         // let weightLists = [];

        // for (let i = 0; i < sugarLists.length; i += 6) {
        //   console.log('weightLists.length ',weightLists.length, i)
        //   // while(weightLists.length>0){
        //   //   weightLists.pop()
        //   // }
          
        //  for(let j=i;j<i+6;j++){
         
        //   console.log('j ',weightLists)
        //   weightLists.push(sugarLists[j]);
        //   weightLists.push(sugarLists[j+1]);
        //   weightLists.push(sugarLists[j+2]);
        //   weightLists.push(sugarLists[j+3]);
        //   weightLists.push(sugarLists[j+4]);
        //   weightLists.push(sugarLists[j+5]);
        //  }
        //  const eachDate = [...new Set(weightLists)];

        //   setweightList(...new Set(weightLists))
         
          //  }





          // console.log("sus ", weightList);

        res.data.sugar.forEach((element) => {
          sugarLists.push(element);
          // setsugarList(element);
        });
        res.data.weight.forEach((element) => {
          weightLists.push(element);
          // setweightList(element);
        });
        res.data.pulse.forEach((element) => {
          pulseLists.push(element);
          // setpulseList(element);
        });
        res.data.sys.forEach((element) => {
          sysLists.push(element);
          // setsysList(element);
        });
        res.data.dias.forEach((element) => {
          diasLists.push(element);
          // setdiasList(element);
        });
        res.data.date.forEach((element) => {
          datelists.push(element);
          // setdiasList(element);
        });
      })
      .catch((err) => {
        console.log(err, "Geeeeeen");
      });

    setsugarList(sugarLists);
    setpulseList(pulseLists);
    setweightList(weightLists);
    setsysList(sysLists);
    setdiasList(diasLists);
    setdateList(datelists);
  };
  console.log('sugarLists ',sugarList)
  return (
    <div>
      <pre></pre>
      <pre></pre>
      <div style={{ backgroundColor: "#e8fbe8", height: "auto" }}>
        <pre></pre>

        <div
          style={{
            color: "#155844",
            marginLeft: "30%",
            marginTop: "3%",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {" "}
          📅 View Your Monthly General Health Information Details
        </div>
        <div style={{ color: "#155844", marginLeft: "30%", marginTop: "3%" }}>
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
        <div className="gen_history_table">
        <div className="gen_history_table_header">
          <span>Date</span>
          <span>Weight</span>
          <span>Sugar</span>
          <span>Pulse Rate</span>
          <span>Blood Pressure</span>
        </div>
        <Table hover size="sm">
          <thead>
            {/* <tr style={{ background: "transparent" }}>
              <th>Date</th>
              <th>Weight</th>
              <th>Sugar level</th>
              <th>Pulse Rate</th>
              <th>Systolic Blood Pressure</th>
              <th>Diastolic Blood Pressure</th>
            </tr> */}
          </thead>

          <tbody>
            <div>
            {dateList.map((food, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{dateList[index]} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
                <td>{weightList[index]}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
                <td>{sugarList[index]}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</td>
                <td>{pulseList[index]}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;</td>
                <td>{diasList[index]+'/'+sysList[index]}</td>
               
              </tr>
            ))}
            </div>
          </tbody>
        </Table>
        </div>
        <pre></pre>
        <pre></pre>
        
      </div>
    </div>
  );
}
export default GenHealthHistoryTable;
