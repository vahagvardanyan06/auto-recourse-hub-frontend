import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NOTIFICATION_SLICE_NAME } from "../constants";
import { notificationInitialState } from "../initialStates";
import { INotificationState } from "../types";

const notificationSlice = createSlice({
  name: NOTIFICATION_SLICE_NAME,
  initialState: notificationInitialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotificationState>) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({
      ...state,
      open: false,
    }),
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
