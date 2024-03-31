import { getServerSideProps } from "@/app/api/fetchApp";
import { Container } from "@mui/material";
import PreviewCarousel from "@/components/PreviewCarousel";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProductTypeCards from "@/components/ProductTypeCards";
import Products from "@/components/Products";
import { useMemo } from "react";
import getImagesFromProducts from "@/utils/getImagesFromProducts";
import IApp from "./types";

const Page = ({ categories, topProducts }: IApp) => {
  const isMobile = useIsMobile();

  const previewImages = useMemo(
    () => getImagesFromProducts(topProducts),
    [topProducts]
  );

  return (
    <Container maxWidth="lg" className="flex flex-col gap-12">
      <PreviewCarousel images={previewImages} />
      <ProductTypeCards categories={categories} />
      <Products products={topProducts} />
    </Container>
  );
};

export { getServerSideProps };

export default Page;
