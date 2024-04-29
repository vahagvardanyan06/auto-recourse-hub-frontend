import { API_BASE_URL } from "@/tmp/endpoints";
import { GetServerSidePropsContext } from "next";

const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const q = query.q as string;

  if (!q) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const searchResult_res = await fetch(
    `${API_BASE_URL}/products/search?productName=${encodeURIComponent(q)}`
  );

  const searchResult = await searchResult_res.json();

  return {
    props: {
      searchData: searchResult.length ? searchResult : null,
      searchKeyWord: q,
    },
  };
};

export default getServerSideProps;
