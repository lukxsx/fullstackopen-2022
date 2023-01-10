import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotificationText: (state, action) => {
            return action.payload
        }
    }
})

export const { setNotificationText } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch(setNotificationText(message))
        setTimeout(() => dispatch(setNotificationText('')), timeout)
    }
}

export default notificationSlice.reducer
