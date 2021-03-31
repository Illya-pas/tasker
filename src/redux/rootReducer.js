import {combineReducers} from 'redux'
import {cardReducer} from './cardReducer'
import {appReducer} from './appReducer'

export const rootReducer = combineReducers({
	cards: cardReducer,
	app: appReducer,
})