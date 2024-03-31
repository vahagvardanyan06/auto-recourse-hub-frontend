import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageInitialState as initialState } from "../initialStates";
import { LANGUAGE_SLICE_NAME } from "../constants";
import { ILanguageState } from "../types";

const languageSlice = createSlice({
  name: LANGUAGE_SLICE_NAME,
  initialState,
  reducers: {
    updateLanguage: (state: ILanguageState, action: PayloadAction<string>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { updateLanguage } = languageSlice.actions;
export default languageSlice.reducer;
