import React from "react";
import ICategoryName from "./types";
import category_name_texts from "@/messages/categoryName";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";

const CategoryName = ({ category_name }: ICategoryName) => {
  console.log("category_name", category_name);

  const language = useSelector(selectLanguage);
  return (
    <div className="flex w-full justify-between border-t-8 border-b-8 border-red py-4 pr-8">
      <Typography>{category_name_texts.category[language]}</Typography>
      <Typography>{category_name}</Typography>
    </div>
  );
};

export default CategoryName;
