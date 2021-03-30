import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import {createCard, sleep} from '../redux/actions'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles({
  form:{
    display: "flex",
    flexDirection: "column",
    "& input, textarea": {
    	padding: 10,
    	fontSize: 16,
    	marginTop: 20,
    	resize: "none",
    	"&::placeholder": {
    		fontSize: 16,
    	},
    },
  },
  button: {
  	width: "fit-content"
  },
  margin:{
  	marginTop: 20
  }
})

export default function Form({getItem, setShowAlert}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const {handleSubmit, register, reset} = useForm();


  const [responseInfo, setResponseInfo] = useState("")

  const onSubmit = async(data, e) => {
  	let formdata = new FormData();
		formdata.append("email", data.email);
		formdata.append("text", data.text);
		formdata.append("username", data.username);

		let info = await dispatch(createCard(formdata))
		if (info.status === "error") {
			setResponseInfo(info.message)
			await sleep(5000)
			setResponseInfo("")
		} else {
			getItem()
			e.target.reset()
			setShowAlert(true)
			await sleep(3000)
			setShowAlert(false)
		}
  }

	return (
		<>
			<h2>Create Task</h2>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<input type="text"
					ref={register()}
					placeholder="Your username"
					name="username"
				/>
				{(responseInfo && responseInfo.username) && <FormHelperText error>{responseInfo.username}</FormHelperText>}
				<input type="text"
					ref={register()}
					placeholder="Your email"
					name="email"
				/>
				{(responseInfo && responseInfo.email) && <FormHelperText error>{responseInfo.email}</FormHelperText>}
				<textarea cols="30" rows="5" type="text"
					ref={register()}
					placeholder="Some text..."
					name="text"
				>
				</textarea>
				{(responseInfo && responseInfo.text) && <FormHelperText error>{responseInfo.text}</FormHelperText>}

				<div className={classes.margin}></div>

				<Button 
				className={classes.button}
				 variant="contained" 
				 color="primary"
				 type="submit"
				 >
				  Add
				</Button>
			</form>
		</>
	)
}