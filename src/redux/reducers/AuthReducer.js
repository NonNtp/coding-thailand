import { GET_PROFILE, GET_VERSION } from '../actions/AuthAction'
const initState = {
	profile: null,
}

const AuthReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload.profile,
			}
		case GET_VERSION:
			return {
				...state,
				version: action.payload.version,
			}

		default:
			return state
	}
}

export default AuthReducer
