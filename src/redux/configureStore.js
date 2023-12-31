import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['CartReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
	let store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk))
	)
	let persistor = persistStore(store)
	return { store, persistor }
}

export default configureStore
