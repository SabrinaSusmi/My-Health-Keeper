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


export const UserIDContext=React.createContext()
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

 localStorage.setItem("userID",auth.user._id)
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
showSPHealthNotes()

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
          <Route path="/" component={isLogged ? Header : Landing} exact />
          {/* <Route path="/my-healtKeeper" component={Landing} exact />  */}
          <Route path="/forgot_password" component={ForgotPassword} exact />
          <Route path="/user/reset/:token" component={ResetPassword} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Header />
        </Switch>
      </div>
    </Router>
 
    </UserIDContext.Provider>
   </>
   );
}

export default App;
