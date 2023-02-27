import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", timeout: null, warning: false },
  reducers: {
    setNotificationObject: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNotificationObject } = notificationSlice.actions;

export const setNotification = (message, timeOut, warning) => {
  return async (dispatch, getState) => {
    clearTimeout(getState().notification.timeout);
    const timeout = setTimeout(
      () =>
        dispatch(
          setNotificationObject({
            message: "",
            timeout: null,
            warning: warning,
          })
        ),
      timeOut
    );
    dispatch(setNotificationObject({ message, timeout, warning }));
  };
};

export default notificationSlice.reducer;
