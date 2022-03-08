import { combineReducers } from 'redux'
import { usersReducer } from './userReducer'
import { notificationsReducer } from './notificationReducer'

export const appReducer = combineReducers({
    user: usersReducer,
    notification: notificationsReducer
})