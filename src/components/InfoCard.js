import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import {useDispatch, useSelector} from 'react-redux'
import {changer, redirect} from '../redux/actions'

const useStyles = makeStyles({
  root: {
    width: 280,
    position: "relative",
    display: "inline-block",
    marginLeft: 20,
    marginTop: 20,
    height: 170,
    "& textarea": {
      resize: "none",
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  mail: {
    marginBottom: 12,
  },
  text: {
  	overflowWrap: "break-word"
  },
  icons: {
  	width: "100%",
  	position: "absolute",
  	display: "flex",
  	justifyContent: "flex-end",
  	"& svg": {
  		margin: "5px 5px 0 0",
  		padding: 5,
  		color: "grey",
  		border: "1px solid grey",
  		borderRadius: "50%",
  		fontSize: "18px"
  	},
  },
  complete: {
  	backgroundColor: "blue",
  	color: "black !important",
  	border: "1px solid black !important",
  }
});

export default function InfoCard({fetchedCard, getItem}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)

  const [isComplete, setIsComplete] = useState(fetchedCard.status === 10 || fetchedCard.status === 11)
  const [isChanged, setIsChanged] = useState(fetchedCard.status === 1 || fetchedCard.status === 11)
  const [changeValue, setChangeValue] = useState(false)
  const [cardValue, setCardValue] = useState(fetchedCard.text.slice(0,115))
  const [textValue, setTextValue] = useState(fetchedCard.text.slice(0,115))

  const token = localStorage.getItem("token");

  const getStatus = (first, changeFirst, second, changeSecond) => {
    if (fetchedCard.status === first || fetchedCard.status === changeFirst) {
      return changeFirst
    }
    if (fetchedCard.status === second || fetchedCard.status === changeSecond) {
      return changeSecond
    }
  }

  const setComplete = async() => {
    if (isAuth) {
      let formdata = new FormData();
      formdata.append("token", token);
      isComplete 
      ? formdata.append("status", getStatus(10, 0, 11, 1))
      : formdata.append("status", getStatus(0, 10, 1, 11))

      let complateInfo = await dispatch(changer(formdata, fetchedCard.id))
      if (complateInfo.status === "ok") {
        setIsComplete(!isComplete)
      } else {
        localStorage.removeItem("token")
        dispatch(redirect("login"))
      }
    }
  }

  const setChange = () => {
    isAuth && setChangeValue(true)
  }

  const handleChange = (e) => {
    setCardValue(e.target.value)
  }

  const handleClickAway = async(e) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("text", cardValue);
    formdata.append("status", getStatus(0, 1, 10, 11));

    setChangeValue(false)

    let changeInfo = await dispatch(changer(formdata, fetchedCard.id))
    if (changeInfo.status === "ok") {
      setTextValue(cardValue)
      setIsChanged(true)
    } else {
      localStorage.removeItem("token")
      dispatch(redirect("login"))
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
    	<div className={classes.icons}>
    		<CreateIcon style = {isAuth ? {cursor: "pointer"} : null}
          className={
            classes.pen,
            isChanged ? classes.complete : null
          }
          onClick={setChange}
        />
    		<CheckIcon style = {isAuth ? {cursor: "pointer"} : null}
          className={
            classes.check,
            isComplete ? classes.complete : null
          }
          onClick={setComplete}
        />
    	</div>
      <CardContent>
        <Typography variant="h5" component="h2">
          {fetchedCard.username.slice(0,20)}
        </Typography>
        <Typography className={classes.mail} color="textSecondary">
          {fetchedCard.email.slice(0,30)}
        </Typography>
        {changeValue 
          ?
          <ClickAwayListener onClickAway={handleClickAway}>
            <textarea cols="28" rows="5" type="text" 
              value={cardValue}
              onChange={handleChange}>
            </textarea>
          </ClickAwayListener>
          :
          <Typography className={classes.text} variant="body2" component="p">
            {textValue}
          </Typography>
        }
      </CardContent>
    </Card>
  );
}