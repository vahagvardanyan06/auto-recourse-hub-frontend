import languages from "@/constants/languages";
import { ILanguageState, INotificationState } from "./types";

export const LanguageInitialState = {
  value: languages[0].code,
} as ILanguageState;

export const notificationInitialState: INotificationState = {
  open: false,
  type: "info",
  message: "",
  timeout: 5000,
};
