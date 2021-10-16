import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";
import Login from "./components/body/auth/Login";
import Header from "./components/header/Header";
import axios from "axios";
import Signup from "./components/body/auth/Signup";
import Landing from "./components/LandingPage";
import ForgotPassword from "./components/body/auth/ForgotPassword";
import ResetPassword from "./components/body/auth/ResetPassword";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import Profile from "./components/body/profile/Profile";
import Home from "./components/body/home/Home";

import MedicineInput from "./components/body/medicineReminder/InputMedReminder";
import DisplayMedicineReminders from "./components/body/medicineReminder/DisplayMedReminders";
import MenstrualCycle from "./components/body/MenstrualCycle/MenstrualCycle";
import HealthInfo from "./components/body/genHealthInfo/HealthInfo";
import GenHealthDashboard from "./components/body/genHealthInfo/GenHealthDashboard";
import GenHealthHistoryTable from "./components/body/genHealthInfo/GenHealthHistory";
import MedicineDose from "./components/body/medicineReminder/MedDoses";
import specializedHealthInfo from "./components/body/specializedHealthInfo/specializedHealthInfo";
import ViewFiles from "./components/body/specializedHealthInfo/ViewFiles";
import DietPlan from "./components/body/dietPlan/DietPlan";
import DietGoalSetter from "./components/body/dietPlan/DietGoalSetter";
import DiseasePrediction from "./components/body/diseasePrediction/DiseasePrediction";
import MenstrualDemo from "./components/body/MenstrualCycle/MenstrualDemo";
import DietProgress from "./components/body/dietPlan/DietProgress";
import ReportsMain from "./components/body/reports/reportsMain";

export const UserIDContext = React.createContext();
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  const { isLogged } = auth;

  localStorage.setItem("userID", auth.user._id);
  const showSPHealthNotes = () => {
    // console.log("id     ",  auth.user._id);
    axios
      .get("http://localhost:5000/api/get-specializedHealthInfo", {
        headers: { Authorization: token, userid: auth.user._id },
      })
      .then((res) => {
        // console.log("apppp             ",res.data);
        // setSpHealthNotes(res.data);
        // localStorage.setItem("spUser",res.data[0].user)
      });
  };
  showSPHealthNotes();

  const getMenstrualInfo = async () => {
    const id = auth.user._id;
    axios
      .get(`http://localhost:5000/user/is-initial-data-available`, {
        headers: { Authorization: token, userid: id },
      })
      .then((response) => {
        const data1 = response.data.user;
        localStorage.setItem("UserMenstrualInfo", data1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getMenstrualInfo();

  return (
    <>
      <UserIDContext.Provider value={localStorage.getItem("userID")}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" component={isLogged ? Home : Landing} exact />
              {/* <Route path="/my-healtKeeper" component={Landing} exact />  */}
              <Route path="/forgot_password" component={ForgotPassword} exact />
              <Route
                path="/user/reset/:token"
                component={ResetPassword}
                exact
              />
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={Signup} exact />
              {/* <Header /> */}
              <Route path="/home" component={isLogged ? Home : Login} exact />

              <Route
                path="/user/activate/:activation_token"
                component={ActivationEmail}
                exact
              />
              <Route
                path="/profile"
                component={isLogged ? Profile : Login}
                exact
              />
              <Route
                path="/medicine-reminder"
                component={isLogged ? MedicineInput : Login}
                exact
              />
              <Route
                path="/display-medicine-reminderList"
                component={isLogged ? DisplayMedicineReminders : Login}
                exact
              />
              <Route
                path="/menstrual-cycle"
                component={isLogged ? MenstrualCycle : Login}
                exact
              />
              <Route
                path="/report-analysis"
                component={isLogged ? ReportsMain : Login}
                exact
              />

<Route
          path="/menstrual-cycle_demo"
          component={isLogged ? MenstrualDemo : Login}
          exact
        />
              <Route
                path="/general-health-dashboard"
                component={isLogged ? GenHealthDashboard : Login}
                exact
              />
              <Route
                path="/general-health-information"
                component={isLogged ? HealthInfo : Login}
                exact
              />
              <Route
                path="/general-health-history"
                component={isLogged ? GenHealthHistoryTable : Login}
                exact
              />
              <Route
                path="/medicine-doses"
                component={isLogged ? MedicineDose : Login}
                exact
              />

              <Route
                path="/specialized-health-information"
                component={isLogged ? specializedHealthInfo : Login}
                exact
              />
              <Route
                path="/view-files"
                component={isLogged ? ViewFiles : Login}
                exact
              />

              <Route
                path="/diet-plans"
                component={isLogged ? DietPlan : Login}
                exact
              />
              <Route
                path="/set-diet-goal"
                component={isLogged ? DietGoalSetter : Login}
                exact
              />

              <Route
                path="/disease-prediction"
                component={isLogged ? DiseasePrediction : Login}
                exact
              />

<Route
                path="/diet-plans/progress"
                component={isLogged ? DietProgress : Login}
                exact
              />
            </Switch>
          </div>
        </Router>
      </UserIDContext.Provider>
    </>
  );
}

export default App;
