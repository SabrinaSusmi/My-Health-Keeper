import React, { useState } from "react";
import "../../../static/Styling/dietPlan.css";
import "../../../static/Styling/healthInfo.css";
import "react-responsive-modal/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { Select, IconButton, Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { TextField } from "@material-ui/core";

function GenHisDemo() {
  const [sugarList, setsugarList] = useState();
  const [weightList, setweightList] = useState([]);
  const [diasList, setdiasList] = useState([]);
  const [pulseList, setpulseList] = useState([]);
  const [sysList, setsysList] = useState([]);
  const [dateList, setdateList] = useState([[]]);
  const [genList, setGenList] = useState([]);

  const token = useSelector((state) => state.token);
  const [healthInfo, setHealthInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [info, setInfo] = useState([]);
  console.log("susy ", dateList);

  const getMonthlyGenInfo = async (e, gen) => {
    e.preventDefault();
    await axios
      .get("http://localhost:5000/genHealthMonthlyHistory/"+gen, {
        headers: { Authorization: token, months: selectedDate, year: year },
      })
      .then((res) => {
        console.log(res.data.infoData[0]);
        setGenList(res.data.infoData);
        // res.data.infoData.forEach((element) => {
        //    sugar_array.push(element);
        // });
      })
      .catch((err) => {
        console.log(err, "Geeeeeen");
      });
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

          <div className="add_btn_diet">
        <Button
          type="submit"
          className="add_btn"
          variant="contained"
          onClick={(e) => getMonthlyGenInfo(e, "Bp")}
          color="white"
        >
          <font className="add_btn_diet_font"> Add food</font>
        </Button>
      </div>

          {/* <IconButton
            onClick={(e) => getMonthlyGenInfo(e)}
            style={{ padding: 0 }}
          >
            <VisibilityIcon />
          </IconButton> */}
        </div>
        <div className="diet_info_item_progress"></div>
        <pre></pre>
        <pre></pre>
        <Table hover size="sm">
          <thead>
            <tr style={{ background: "transparent" }}>
              <th>Date</th>
              <th>Info</th>
            </tr>
          </thead>

          <tbody>
            <div>
            {genList.map((genItem, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{genItem[0].inputDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td>{genItem[0].info}</td>
               
              </tr>
            ))}
            </div>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default GenHisDemo;
