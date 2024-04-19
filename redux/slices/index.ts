import { combineReducers } from "redux";
import languageReducer from "../slices/languageSlice";
import notificationReducer from "../slices/notificationSlice";

const rootReducer = combineReducers({
  language: languageReducer,
  notification: notificationReducer,
});

export default rootReducer;
