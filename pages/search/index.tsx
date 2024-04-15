import React from "react";
import getServerSideProps from "@/app/api/search";
import Layout from "@/components/Layout";
import NotSearchResult from "@/components/NotSearchResult/NotSearchResult";
import ISearch from "./types";
import Products from "@/components/Products";

const Search = ({ searchData }: ISearch) => {
  console.log("search data--->", searchData);

  return (
    <Layout>
      {searchData ? <Products products={searchData} /> : <NotSearchResult />}
    </Layout>
  );
};

export default Search;

export { getServerSideProps };
