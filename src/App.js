import './App';
import Main from "./pages/Main"
import Login from "./pages/Login"
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
  app:{
    display: "flex",
    justifyContent: "center",
  },
  root:{
    width: "100%",
    maxWidth: 1800,
    justifyContent: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 40,
  },
  alert: {
    width: 280
  }
})

function App() {
  const classes = useStyles();

  const alert = useSelector(state => state.app.alert)
  const alertType = useSelector(state => state.app.alertType)

  return (
    <div className={classes.app}>
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Main}/>
          </Switch>
        </Router>

        {alert && <div className={classes.container}>
        <Alert className={classes.alert} 
          variant="filled"
          severity={alertType}>{alert}</Alert>
        </div>}
      </div>
    </div>
  );
}

export default App;
