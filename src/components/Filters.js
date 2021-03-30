import React, {useState} from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from "@material-ui/core/styles"
import {setFilters, fetchCards} from '../redux/actions'
import {useDispatch, useSelector} from 'react-redux'

const useStyles = makeStyles({
  root:{
  	"& span": {
  		position: "relative",
  		fontSize: 16,
  		padding: "5px 5px",
  		borderRight: "1px solid white",
  		cursor: "pointer",
  		"&:first-child":{
  			borderLeft: "1px solid white",
  		}
  	},
  	"@media (max-width: 550px)": {
      position: "absolute",
      left: 0,
      marginTop: 70,
      backgroundColor: "#3f51b5",
      "& span": {
      	fontSize: "14px"
    	}
    }
  },
  arrow:{
  	fontSize: 15,
  	paddingLeft: 5,
  	marginBottom: -1
  }
})

export default function Filters() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [activeArrow, setActiveArrow] = useState(0)
  const [activeSort, setActiveSort] = useState("")

  const currentPage = useSelector(state => state.cards.currentPage)

  let counter = activeArrow

	const getDirection = () => {
		if (counter === 1) {
			return {sort_direction: "asc"}
		}
		if (counter === 2) {
			return {sort_direction: "desc"}
		} else {
			return null
		}
	}

  const sorting = async(type) => {
  	if (activeSort === type) {
  		++counter
  		setActiveArrow(counter)
  	} else {
  		setActiveSort(type)
  		counter = 1
  		setActiveArrow(counter)
  	}
  	let direction = getDirection()
  	direction ? dispatch(setFilters({sort_field: type , ...direction})) : dispatch(setFilters(null))
  	direction ? dispatch(fetchCards(currentPage, {sort_field: type , ...direction})) : dispatch(fetchCards(currentPage))
  }

  const getArrow = () => {
  	if (activeArrow === 0) {
  		return
  	}
  	if (activeArrow === 1) {
  		return <ArrowUpwardIcon className={classes.arrow}/>
  	}
  	if (activeArrow === 2) {
  		counter = -1
  		return <ArrowDownwardIcon className={classes.arrow}/>
  	}
  }

	return (
		<div className={classes.root}>
			<span
				onClick={() => sorting("id")}
			>
			ID
			{(activeSort === "id") && getArrow()}
			</span>
			<span
				onClick={() => sorting("username")}
			>
			USERNAME
			{(activeSort === "username") && getArrow()}
			</span>
			<span
				onClick={() => sorting("email")}
			>
			EMAIL
			{(activeSort === "email") && getArrow()}
			</span>
			<span
				onClick={() => sorting("status")}
			>
			STATUS
			{(activeSort === "status") && getArrow()}
			</span>
		</div>
	)
}