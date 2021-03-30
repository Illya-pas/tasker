import {AUTH_USER} from './types'

const initialState = {
	isAuth: localStorage.getItem('token') ? true : false
}

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case AUTH_USER:
			return {...state, isAuth: action.payload}

		default: return state
	}
}