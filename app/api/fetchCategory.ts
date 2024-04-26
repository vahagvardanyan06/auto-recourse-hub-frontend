import { API_BASE_URL } from "@/tmp/endpoints";
import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const categoryName = params?.category as string;

  const res = await fetch(`${API_BASE_URL}/category/name/${categoryName}`);
  const data = await res.json();

  if (!data.category_name) {
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
