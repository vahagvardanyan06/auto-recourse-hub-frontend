import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const categoryId = params?.category as string;
  const spitedCtaegoryId = categoryId.split("-");
  const id = spitedCtaegoryId[spitedCtaegoryId.length - 1];

  const categoryName = decodeURIComponent(
    spitedCtaegoryId.slice(0, -1).join(" ")
  );

  const res = await fetch(`http://localhost:3002/${id}`);
  const data = await res.json();

  if (!data.category_name) {
    return {
      notFound: true,
    };
  }

  if (
    categoryName &&
    categoryName !== data?.category_name["us"].toLowerCase()
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};
