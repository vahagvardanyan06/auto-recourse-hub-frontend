import { AlertColor } from "@mui/material";

export interface ILanguageState {
  value: "us" | "am" | "ru";
}

export interface INotificationState {
  open?: boolean;
  type?: AlertColor;
  message?: string;
  timeout?: number | null;
}
export default interface IRootState {
  language: ILanguageState;
  notification: INotificationState;
}
