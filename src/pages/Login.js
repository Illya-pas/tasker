import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { FormHelperText } from "@material-ui/core";
import {useDispatch} from 'react-redux'
import {authUser, redirect, sleep} from '../redux/actions'

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		"& h2": {
			margin: 0,
			textAlign: "center"
		}
	},
  form:{
  	width: "fit-content",
    display: "flex",
    flexDirection: "column",
    "& input": {
    	padding: 10,
    	fontSize: 16,
    	marginTop: 20,
    	"&::placeholder": {
    		fontSize: 16,
    	},
    },
  },
  margin:{
  	marginTop: 20
  }
})

export default function Login() {

	const classes = useStyles();
  const dispatch = useDispatch()

	const {handleSubmit, register} = useForm();

  const [responseInfo, setResponseInfo] = useState("")

  const onSubmit = async(data, e) => {
  	let formdata = new FormData();
		formdata.append("username", data.login);
		formdata.append("password", data.password);

		let info = await dispatch(authUser(formdata))
		if (info.status === "error") {
			setResponseInfo(info.message)
			await sleep(5000)
			setResponseInfo("")
		} else {
			localStorage.setItem('token', info.message.token)
			redirect("")
		}
  }

	return (
		<div className={classes.root}>
			<h2>Authorization</h2>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<input type="text"
					ref={register()}
					placeholder="Your login"
					name="login"
				/>
				{(responseInfo && responseInfo.login) && <FormHelperText error>{responseInfo.username}</FormHelperText>}
				<input type="password"
					ref={register()}
					placeholder="Your password"
					name="password"
				/>
				{(responseInfo && responseInfo.password) && <FormHelperText error>{responseInfo.password}</FormHelperText>}

				<div className={classes.margin}></div>

				<Button 
				className={classes.button}
				 variant="contained" 
				 color="primary"
				 type="submit"
				 >
				  Login
				</Button>
			</form>
		</div>
	)
}