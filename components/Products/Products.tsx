import ProductCard from "@/components/ProductCard";
import { Grid } from "@mui/material";
import IProductsProps from "./types";
import { IProduct } from "@/types/types";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import React from "react";

const Products = ({ products }: IProductsProps) => {
  const language = useSelector(selectLanguage);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            src={product.images[0]?.url}
            id={product?.id || product["_id"]}
            category_name={product.category_name}
            price={product.price}
            type={product.product_name[language]}
            phoneNumber={product.contactInfo.phoneNumber}
          />
        ))}
      </Grid>
    </>
  );
};

export default Products;
