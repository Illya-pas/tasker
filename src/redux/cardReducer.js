import {FETCH_ARTICLES, CHANGE_TOTAL, SET_FILTERS, SET_CURRENT_PAGE} from './types'

const initialState = {
	cards: [],
	total: 0,
	filters: null,
	currentPage: 1
}

export const cardReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHANGE_TOTAL:
			return {...state,total: action.payload}

		case FETCH_ARTICLES:
			return {...state, cards: action.payload}

		case SET_CURRENT_PAGE:
			return {...state, currentPage: action.payload}

		case SET_FILTERS:
			return {...state, filters: action.payload}
		default: return state
	}
}