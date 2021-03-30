import { get, post } from "./apiCalls"
import {
	FETCH_ARTICLES,
	CHANGE_TOTAL,
	SET_FILTERS,
	SET_CURRENT_PAGE,
	AUTH_USER
} from './types'

const DOMEN = "http://mytasker.zzz.com.ua/"

export function setFilters (filters) {
	return async (dispatch) => {
		dispatch({type: SET_FILTERS, payload: filters});
	}
}

export function fetchCards (page, sort) {
	return async (dispatch) => {
		let params = {page, ...sort} || {page: page}
		let response = await get(params)
		let tasks = response.message.tasks
		let total = response.message.total_task_count

		dispatch({type: FETCH_ARTICLES, payload: tasks});
		dispatch({type: CHANGE_TOTAL, payload: total});
		dispatch({type: SET_CURRENT_PAGE, payload: page});
	}
}

export function createCard (formdata) {
	return async (dispatch) => {
		let resp = await post(formdata, "create")
		return resp
	}
}

export function authUser (formdata) {
	return async (dispatch) => {
		let resp = await post(formdata, "login")
		return resp
	}
}

export function changer (formData, itemId) {
	return async (dispatch) => {
		let changeInfo = await post(formData, "edit/"+itemId)
		return changeInfo
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

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))