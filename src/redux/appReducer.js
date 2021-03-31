import {AUTH_USER, SHOW_ALERT, HIDE_ALERT, ALERT_TYPE} from './types'

const initialState = {
	isAuth: localStorage.getItem('token') ? true : false,
	alert: null,
	alertType: "error"
}

export const appReducer = (state = initialState, action) => {
	switch(action.type) {
		case AUTH_USER:
			return {...state, isAuth: action.payload}

		case SHOW_ALERT:
			return {...state, alert: action.payload}

		case HIDE_ALERT:
			return {...state, alert: null}

		case ALERT_TYPE:
			return {...state, alertType: action.payload}

		default: return state
	}
}