export const getServerSideProps = async () => {
  try {
    const res_categories = await fetch("http://localhost:3002/category");
    const categories = await res_categories.json();

    const res_topProducts = await fetch(
      "http://localhost:3002/products/top_sale"
    );

    const topProducts = await res_topProducts.json();

    return {
      props: {
        categories,
        topProducts,
      },
    };
  } catch (err) {}
};
