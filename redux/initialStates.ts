import languages from "@/constants/languages";
import { ILanguageState } from "./types";

export const LanguageInitialState: ILanguageState = {
  value: languages[0].code,
};
