import React, { useMemo } from "react";
import { getServerSideProps } from "@/app/api/fetchProduct";
import { IProductById } from "../../../types/types";
import { Container, Typography } from "@mui/material";
import PreviewCarousel from "@/components/PreviewCarousel";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import CategoryName from "@/components/CategoryName";
import ProductDescription from "@/components/ProductDescription";
import ContactContainer from "@/components/ContactContainer";
import SimilarProducts from "@/components/SimilarProducts";
import Layout from "@/components/Layout";

const Page = ({ categoryData, productData }: IProductById) => {
  const language = useSelector(selectLanguage);

  const productsToShown = useMemo(() => {
    return categoryData.products.filter((item) => item.id !== productData.id);
  }, [categoryData.products, productData._id]);

  const previewImages = useMemo(() => {
    return productData.images.map((image) => image.url);
  }, [productData]);

  return (
    <Layout title={productData.product_name[language]}>
      <Container maxWidth="lg" className="w-full gap-3 flex flex-col">
        <PreviewCarousel images={previewImages} />
        <Typography> {productData.product_name[language]} </Typography>
        <Typography className="text-yellow-400">{productData.price}</Typography>
        <CategoryName category_name={categoryData.category_name[language]} />
        <ProductDescription description={productData.description[language]} />
        <ContactContainer contactInfo={productData.contactInfo} />
        <SimilarProducts products={productsToShown} />
      </Container>
    </Layout>
  );
};

export { getServerSideProps };

export default Page;
