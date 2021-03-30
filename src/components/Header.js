import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Filters from "./Filters"
import { makeStyles } from "@material-ui/core/styles";
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    maxWidth: "fit-content",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    "& a": {
      color: "white",
      textDecoration: "none"
    }
  }
}));

export default function Header({isAuth, setAuth}) {
  const classes = useStyles();

  const clearData = () => {
    localStorage.removeItem("token")
  }

  const handleClick = () => {
    if (isAuth) {
      clearData()
      setAuth(false)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Tasker
          </Typography>
          <Filters/>
          <NavLink to="/login"><Button 
            color={isAuth ? "secondary" : "inherit"}
            onClick= {handleClick}
          >{isAuth ? "Logout" : "Login"}</Button></NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}