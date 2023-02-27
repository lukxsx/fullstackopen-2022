import { createSlice } from "@reduxjs/toolkit";

const blankNotif = { message: "", warning: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState: blankNotif,
  reducers: {
    setNotification(state, action) {
      const newNotif = action.payload;
      state = newNotif;
      setTimeout(() => {
        state = blankNotif;
      }, 5000);
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
