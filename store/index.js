import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appReducer } from './reducers'

export const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
)