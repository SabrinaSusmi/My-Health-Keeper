import React, { useState, useEffect } from "react";
import { Button, Link, TextField, Select, IconButton } from "@material-ui/core";
import "../../../static/Styling/dietProgress.css";
import { useSelector } from "react-redux";
import axios from "axios";
import CalorieConsumptionChart from './CalorieBurnedChart'
import { COLORS } from "../../themeColors";
import Autocomplete from "@material-ui/lab/Autocomplete";

const InitialState = {
  
  calAmount: "",
 
};

export default function BurnedCalories() {
  const [burnCal, setBurnCal] = useState("");
  const [burnedCalListItem, setBurnedCalListItem] = useState([]);
  const [hotline,setHotline]=useState(false)
  // const history = useHistory();
  const token = useSelector((state) => state.token);
  const viewBpInfo = () => {
    setHotline((prev)=>!prev);
  };

  const getRice = async () => {
    await axios
      .get("http://localhost:5000/diet-plan/getBurnedCalorieList", {
        headers: { Authorization: token },
      })
      .then((res) => setBurnedCalListItem(res.data));
  };
  const listoptions = burnedCalListItem.map((option) => {
    // const initialLetter = option.activity;
    return {
      // initialLetter,
      ...option,
    };
  });
  console.log("listoptions ",listoptions)
  const [item, setItem] = useState(InitialState);

  const {calAmount } = item;

  const saveBurnCal = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/diet-plan/burn_calorie",
        { burnedCalories: burnCal },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRice();
  }, []);
  return (
    <div>
      <h3 style={{ color: "#6f9a37", marginBottom: 4 }}>
        Burnt some calories today?
      </h3>
      Track the amount of calories you've burn everyday
      <br></br>
      <div className="add_burn_diet">
        {console.log('food', listoptions)}
  
        
        <TextField
          type="text"
          id="burnedCalories"
          name="burnedCalories"
          label="Kcal"
          value={burnCal}
          onChange={(e) => {
            setBurnCal(e.target.value);
          }}
        ></TextField>
        <Button
          type="submit"
          className="burn_btn"
          variant="contained"
          onClick={saveBurnCal}
          color="white"
        >
          <font> save</font>
        </Button>
        
        <div className="burnList">
               
                  <Button variant='text' className="chartList_btn" onClick={()=>{ viewBpInfo();}}  >view calorie consumption chart</Button>
                  <br></br>         
              {console.log(hotline)}
                {hotline?(<div><CalorieConsumptionChart isVisible={() => viewBpInfo()}/></div>):("")}
              </div>
   
      </div>
    </div>
  );
}
