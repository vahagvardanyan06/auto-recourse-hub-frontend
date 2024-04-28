import { Divider, Typography } from "@mui/material";
import IProductDescription from "./types";
import product_description_texts from "@/messages/productDesciption";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import React from "react";

const ProductDescription = ({ description }: IProductDescription) => {
  const language = useSelector(selectLanguage);

  return (
    <div className="flex flex-col gap-4">
      <Typography>{product_description_texts.description[language]}</Typography>
      <Divider />
      <Typography>{description}</Typography>
    </div>
  );
};

export default ProductDescription;
