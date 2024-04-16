import React, { useCallback, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import languages, { ILanguages } from "@/constants/languages";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import { updateLanguage } from "@/redux/slices/languageSlice";
import { useRouter } from "next/router";

const SelectLanguage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      dispatch(updateLanguage(event.target.value));
    },
    [dispatch]
  );

  return (
    <div>
      <FormControl>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={currentLanguage}
          label="language"
          onChange={handleChange}
          sx={{
            "& fieldset": {
              border: "none",
            },
          }}
        >
          {languages.map(({ native_name, code }: ILanguages) => (
            <MenuItem
              key={native_name}
              value={code}
              className="flex justify-between"
            >
              <ReactCountryFlag countryCode={code} className="pr-1" />
              <span>{native_name}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLanguage;
