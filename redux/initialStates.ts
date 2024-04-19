import languages from "@/constants/languages";
import { ILanguageState, INotificationState } from "./types";

export const LanguageInitialState: ILanguageState = {
  value: languages[0].code,
};

export const notificationInitialState: INotificationState = {
  open: false,
  type: "info",
  message: "",
  timeout: 5000,
};
