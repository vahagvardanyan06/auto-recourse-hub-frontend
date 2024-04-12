export interface ILanguageState {
  value: "us" | "am" | "ru";
}

export default interface IRootState {
  language: ILanguageState;
}
