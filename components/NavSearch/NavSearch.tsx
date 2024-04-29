import React, { ChangeEvent, useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, alpha, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import header_texts from "@/messages/header";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavSearch = () => {
  const language = useSelector(selectLanguage);
  const { push } = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = useCallback(
    (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchValue) {
        push(`/search?q=${searchValue}`);
      }
    },
    [push, searchValue]
  );

  const handleSearchClick = useCallback(() => {
    if (searchValue) {
      push(`/search?q=${searchValue}`);
    }
  }, [push, searchValue]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [setSearchValue]
  );

  return (
    <div className="flex items-center">
      <form onSubmit={handleSubmit}>
        <Search onClick={handleSearchClick}>
          <SearchIconWrapper>
            <SearchIcon className="text-slate-800" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={header_texts.searchPlacehloder[language]}
            className="text-slate-800"
            value={searchValue}
            onChange={handleChange}
          />
        </Search>
      </form>
    </div>
  );
};

export default NavSearch;
