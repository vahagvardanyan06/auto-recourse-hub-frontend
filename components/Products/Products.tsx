import ProductCard from "@/components/ProductCard";
import Each from "../Each";
import { Box, Grid, Modal } from "@mui/material";
import IProductsProps from "./types";
import { IProduct } from "@/pages/types";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";

const Products = ({ products }: IProductsProps) => {
  console.log(products);

  const language = useSelector(selectLanguage);
  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Each
          of={products}
          render={(product: IProduct) => (
            <ProductCard
              src={product.images[0]}
              type={product.product_name[language]}
              price={product.price}
              phoneNumber={product.contactInfo.phoneNumber}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default Products;
