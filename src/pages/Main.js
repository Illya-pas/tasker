import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import InfoCard from '../components/InfoCard'
import Header from "../components/Header"
import Form from "../components/Form"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "../components/Pagination"
import {fetchCards, setIsAuth} from '../redux/actions'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  form: {
    marginRight: 40,
    float: "right",
    width: "fit-content",
    "& h2": {
      margin: 0
    }
  },
  root:{
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  content: {
  	display: "flex",
  	marginTop: 20,
  	"@media (max-width: 700px)": {
  		flexDirection: "column"
  	}
  },
  cardsPages: {
  	width: "100%",
  	display: "flex",
  	alignItems: "center",
  	flexDirection: "column"
  },
  cards: {
  	display: "inline-block",
  	marginTop: 20,
  	marginLeft: -20
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

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [showAlert, setShowAlert] = useState(false)

	const fetchedCards = useSelector(state => state.cards.cards)
  const isAuth = useSelector(state => state.auth.isAuth)
	const sort = useSelector(state => state.cards.filters)

	const getItem = () => {
    let current = document.querySelector(".MuiPagination-root .Mui-selected")
    let currentPage = current ? +current.innerText : 1
    dispatch(fetchCards(currentPage, sort))
  }

  const setAuth = (data) => {
    dispatch(setIsAuth(data))
  }

  useEffect(() => {
    dispatch(fetchCards(1))
  }, [])

	return (
		<div className={classes.root}>
			<Header isAuth={isAuth} setAuth={data => setAuth(data)}/>
			<div className={classes.content}>
				<div className={classes.form}>
          <Form setShowAlert={setShowAlert} getItem={getItem}/>
        </div>
				<div className={classes.cardsPages}>
					<div className={classes.cards}>
						{fetchedCards.map(fetchedCard => {
							return <InfoCard getItem={getItem} key={fetchedCard.id} fetchedCard = {fetchedCard}/>
						})}
					</div>
					<Pagination getItem={getItem}/>
				</div>
			</div>
      {showAlert && <div className={classes.container}>
        <Alert className={classes.alert} 
          variant="filled"
          severity="success">Task successfully created!</Alert>
        </div>}
		</div>
	)
}

export default Main