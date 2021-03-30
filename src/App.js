import './App';
import Main from "./pages/Main"
import Login from "./pages/Login"
import { makeStyles } from "@material-ui/core/styles";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const useStyles = makeStyles({
  app:{
    display: "flex",
    justifyContent: "center",
  },
  root:{
    width: "100%",
    maxWidth: 1800,
    justifyContent: "center"
  }
})

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Main}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
