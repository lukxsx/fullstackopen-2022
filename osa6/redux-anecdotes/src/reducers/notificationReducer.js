import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { message: '', timeout: null },
    reducers: {
        setNotificationObject: (state, action) => {
            return action.payload
        }
    }
})

export const { setNotificationObject } = notificationSlice.actions

export const setNotification = (message, timeOut) => {
    return async (dispatch, getState) => {
        clearTimeout(getState().notification.timeout)
        const timeout = setTimeout(() => dispatch(setNotificationObject({ message: '', timeout: null } )), timeOut)
        dispatch(setNotificationObject({ message, timeout }))
    }
}

export default notificationSlice.reducer
