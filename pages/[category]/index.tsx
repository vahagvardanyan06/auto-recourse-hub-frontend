import React from "react";
import { getServerSideProps } from "@/app/api/fetchCategory";
import ICategory from "./types";
import Products from "@/components/Products";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";

const Page = ({
  data: { category_name, products, id, logo_url },
}: ICategory) => {
  const language = useSelector(selectLanguage);

  return (
    <Container maxWidth="lg" className="w-full">
      <div className="w-full flex content-center justify-center">
        <Typography className="capitalize font-serif text-lg">
          {category_name[language]}
        </Typography>
      </div>
      <Products products={products} />
    </Container>
  );
};

export { getServerSideProps };

export default Page;
