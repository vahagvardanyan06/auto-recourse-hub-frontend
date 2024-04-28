import { API_BASE_URL } from "@/tmp/endpoints";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const productId = params?.id;
  const productCategoryName = params?.category;

  const product_res = await fetch(`${API_BASE_URL}/products/${productId}`);

  const productData = await product_res.json();

  const category_res = await fetch(
    `${API_BASE_URL}/category/name/${productCategoryName}`
  );

  const categoryData = await category_res.json();

  if (!categoryData || !productData?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData,
      categoryData,
    },
  };
};
