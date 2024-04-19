import RootState from "./types";

export const selectLanguage = (state: RootState) => state.language.value;
export const selectNotification = (state: RootState) => state.notification;
