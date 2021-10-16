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
  // let sugarList = [];
  //   let weightList = [];
  //   let pulseList = [];
  //   let sysList=[]
  //   let diasList=[]
   const [sugarList,setsugarList]=useState() 
   const [weightList,setweightList]=useState([]) 
   const [diasList,setdiasList]=useState([]) 
   const [pulseList,setpulseList]=useState([]) 
   const [sysList,setsysList]=useState([]) 

  const token = useSelector((state) => state.token);
  const [healthInfo, setHealthInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("0");
  const [year, setYear] = useState("0");
  const [info, setInfo] = useState([]);

 const populateTable=()=>{

 }

  const getMonthlyGenInfo = async (e) => {
    e.preventDefault();
let sugarLists = [];
    let weightLists = [];
    let pulseLists = [];
    let sysLists=[]
    let diasLists=[]
    await axios
      .get("http://localhost:5000/genHealthMonthlyHistory", {
        headers: { Authorization: token, months : selectedDate,year: year },
      })
      .then((res) => {
       
       res.data.sugar.forEach((element)=>{
        //  let sugar=element
        //  console.log(sugar)
        // sugarLists.push(element);
        setsugarList(element)

       })
       res.data.weight.forEach((element)=>{
       setweightList(element)
       })
       res.data.pulse.forEach((element)=>{
       setpulseList(element);
       })
       res.data.sys.forEach((element)=>{
        setsysList(element);
       })
       res.data.dias.forEach((element)=>{
        setdiasList(element);
       })

      })
      .catch((err) => {
        console.log(err, "Geeeeeen")
         });

         setsugarList(sugarLists)
  };
console.log(sugarList)
  
  return (

    <div>
    <pre></pre>
      <pre></pre>
     {console.log(sugarList)
}
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
              <th>Weight</th>
              <th>Sugar level</th>
              <th>Pulse Rate</th>
              <th>Systolic Blood Pressure</th>
              <th>Diastolic Blood Pressure</th>
            </tr>
          </thead>

          <tbody>
            {populateTable()}
            {info.map((value, index) => (
              <tr
                style={index % 2 ? { color: "#0777c2" } : { color: "#f7900a" }}
              >
                <td>{value.weightList}</td>
                <td>{value.sugarList}</td>
                <td>{value.pulseList}</td>
                <td>{value.sysList}</td>
                <td>{value.diasList}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div>
                      
   
  );
};
export default GenHealthHistoryTable;