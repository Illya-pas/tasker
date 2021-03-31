import { get, post } from "./apiCalls"
import {
	FETCH_ARTICLES,
	CHANGE_TOTAL,
	SET_FILTERS,
	SET_CURRENT_PAGE,
	AUTH_USER,
	SHOW_ALERT,
	HIDE_ALERT,
	ALERT_TYPE
} from './types'

const DOMEN = "http://mytasker.zzz.com.ua/"
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function setFilters (filters) {
	return async (dispatch) => {
		dispatch({type: SET_FILTERS, payload: filters});
	}
}

export const showAlert = (alertType, alertText = "Something went wrong") => {
	return async (dispatch) => {
		dispatch({type: ALERT_TYPE, payload: alertType});
		dispatch({type: SHOW_ALERT, payload: alertText});
		await sleep(5000)
		dispatch({type: HIDE_ALERT});
	}
}

export function fetchCards (page, sort) {
	return async (dispatch) => {
		try{
			let params = {page, ...sort} || {page: page}
			let response = await get(params)
			let tasks = response.message.tasks
			let total = response.message.total_task_count

			dispatch({type: FETCH_ARTICLES, payload: tasks});
			dispatch({type: CHANGE_TOTAL, payload: total});
			dispatch({type: SET_CURRENT_PAGE, payload: page});
		} catch (e) {
			dispatch(showAlert("error"))
		}
	}
}

export function createCard (formdata) {
	return async (dispatch) => {
		try{
			let resp = await post(formdata, "create")
			return resp
		} catch (e) {
			dispatch(showAlert("error"))
		}
	}
}

export function authUser (formdata) {
	return async (dispatch) => {
		try{
			let resp = await post(formdata, "login")
			return resp
		} catch (e) {
			dispatch(showAlert("error"))
		}
	}
}

export function changer (formData, itemId) {
	return async (dispatch) => {
		try{
			let changeInfo = await post(formData, "edit/"+itemId)
			return changeInfo
		} catch (e) {
			dispatch(showAlert("error"))
		}
	}
}

export function setIsAuth (data) {
	return async (dispatch) => {
		dispatch({type: AUTH_USER, payload: data});
	}
}

export function redirect (href) {
	window.location.href = DOMEN + href
}