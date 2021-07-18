import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Link,
  CardHeader,
  Select,
  Avatar,
} from "@material-ui/core";
import { useCookies } from "react-cookie";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";
import { mainListItems } from "./sidebarOptionList";

import Body from "../body/Body";

import { useSelector } from "react-redux";
import axios from "axios";
import colors from '../../static/Styling/colors.css'
// import Headers from '../../static/Styling/header.css  '
const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 20, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    color: "white",
    background: "#04272f",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  // container: {
  //   paddingTop: theme.spacing(4),
  //   paddingBottom: theme.spacing(4),
  // },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  link: {
    margin: theme.spacing(10, 15),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  image: {
    margin: theme.spacing(1, 1.5),
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  signinTitle: {
    marginRight: "4%",
    opacity: ".95",
    "&:hover": {
      opacity: "1",
    },
  },
  logout: {
    marginLeft: "14px",
  },
  imageIcon: {
    height: "30px",
    width: "30px",
    transform: "translateY(5px)",
    borderRadius: "50%",
    marginRight: "10px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  authStyle: {
    // color: colors.link-color,
    marginLeft: "20px",
  },
}));

function Header() {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const { user, isLogged } = auth;
  const [open, setOpen] = React.useState(true);
  const [cookies,  removeCookie] = useCookies(["user"]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("UserMenstrualInfo")
      localStorage.removeItem("userID")
      localStorage.removeItem("spUser")
       removeCookie("UserMenstrualInfo");
     
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    // console.log(user._id);
    return (
      <div>
        <Link to="/profile"   data-toggle="tooltip"
              title="Profile Settings" component={NavLink}>
          {/* {<img className={classes.imageIcon} src={user.avatar} alt="" />} */}
          <font  className="link-color" >
          {user.name}{" "}
          </font>
        
        </Link>

        <Link
          className={classes.logout}
          component={NavLink}
          to="/"
          onClick={handleLogout}
        ><font  className="link-color" >
          <i className="fas fa-sign-out-alt"></i>Logout
          {""}
          </font>
        </Link>
      </div>
    );
  };

  const authLink = () => {
    return (
      <div>
        <Link component={NavLink} to="/signup"><font  className="link-color" >
        <i class="fas fa-user-plus"></i> Sign up
        </font>
          
        </Link>
        <Link component={NavLink} className={classes.authStyle} to="/login"><font  className="link-color" >
          <i class="fas fa-sign-in-alt"></i> Sign in
          </font>
        </Link>
      </div>
    );
  };
  const genderOfTheUser = () => {
    if (user.gender == "Male") {
      return <List>{mainListItems}</List>;
    } else {
      return (
        <div>
          <List>{mainListItems}</List>
          <ListItem button>
            <ListItemIcon>
              <font color="white">
                <BubbleChartIcon />
              </font>
            </ListItemIcon>
            <Link to="/menstrual-cycle" component={NavLink}>
              <font color="white">
                <ListItemText primary="Menstrual Cycle" />
              </font>
            </Link>
          </ListItem>
        </div>
      );
    }
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          color="default"
          elevation={0}
        >
          <Toolbar className={classes.toolbar}>
            {" "}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              <Link
                component={NavLink}
                to="/home"
                underline="none"
                color="textPrimary"
              >
                My HealthKeeper
              </Link>
            </Typography>
            <Typography className={classes.signinTitle} color="inherit">
              
              <ul style={transForm}>{isLogged ? userLink() : authLink()}</ul>
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              {" "}
              <font color="white">
                <ChevronLeftIcon />
              </font>
            </IconButton>
          </div>
          <Divider />
          {/* {console.log(user.gender)} */}
          {isLogged ? genderOfTheUser() : <font size="5">sign in first</font>}
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
        
            <Body />
          
        </main>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Header;
