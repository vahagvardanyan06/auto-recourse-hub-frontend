import { Divider, Typography } from "@mui/material";
import Products from "../Products";
import ISimilarProducts from "./types";
import similar_products_texts from "@/messages/similarProducts";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import React from "react";

const SimilarProducts = ({ products }: ISimilarProducts) => {
  const language = useSelector(selectLanguage);
  return (
    <div className="flex flex-col gap-5">
      <Divider />
      <Typography>{similar_products_texts[language]}</Typography>
      <Products products={products} />
    </div>
  );
};

export default SimilarProducts;
