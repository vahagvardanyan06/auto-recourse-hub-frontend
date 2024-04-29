import React from "react";
import { getServerSideProps } from "@/app/api/fetchCategory";
import { ICategoryTypes } from "../../types/types";
import Products from "@/components/Products";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import Layout from "@/components/Layout";

const Page = ({ data: { category_name, products } }: ICategoryTypes) => {
  const language = useSelector(selectLanguage);

  return (
    <Layout title={category_name[language]}>
      <Container maxWidth="lg" className="w-full gap-5 flex flex-col">
        <div className="w-full flex content-center justify-center">
          <Typography className="capitalize font-serif text-lg">
            {category_name[language]}
          </Typography>
        </div>
        {products && <Products products={products} />}
      </Container>
    </Layout>
  );
};

export { getServerSideProps };

export default Page;
