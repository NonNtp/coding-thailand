import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import CartReducer from './CartReducer'
const rootReducer = combineReducers({
	AuthReducer,
	CartReducer,
})

export default rootReducer
