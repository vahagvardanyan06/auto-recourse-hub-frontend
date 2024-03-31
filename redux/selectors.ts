import RootState from "./types";

export const selectLanguage = (state: RootState) => state.language.value;
