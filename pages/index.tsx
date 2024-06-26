import React from "react";
import { getServerSideProps } from "@/app/api/fetchApp";
import { Container } from "@mui/material";
import PreviewCarousel from "@/components/PreviewCarousel";
import ProductTypeCards from "@/components/ProductTypeCards";
import Products from "@/components/Products";
import { useMemo } from "react";
import getImagesFromProducts from "@/utils/getImagesFromProducts";
import IApp from "../types/types";
import Layout from "@/components/Layout";

const Page = ({ categories, topProducts }: IApp) => {
  const previewImages = useMemo(
    () => getImagesFromProducts(topProducts),
    [topProducts]
  );

  return (
    <Layout>
      <Container maxWidth="lg" className="flex flex-col gap-12">
        {Boolean(previewImages.length) && (
          <PreviewCarousel images={previewImages} />
        )}
        <ProductTypeCards categories={categories} />
        <Products products={topProducts} />
      </Container>
    </Layout>
  );
};

export { getServerSideProps };

export default Page;
