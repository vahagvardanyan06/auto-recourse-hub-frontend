import { API_BASE_URL } from "@/tmp/endpoints";

export const getServerSideProps = async () => {
  try {
    const res_categories = await fetch(`${API_BASE_URL}/category`);

    const categories = await res_categories.json();

    const res_topProducts = await fetch(`${API_BASE_URL}/products/top_sale`);

    const topProducts = await res_topProducts.json();

    console.log("categories", categories);

    return {
      props: {
        categories,
        topProducts,
      },
    };
  } catch (err) {}
};
