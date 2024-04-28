import React from "react";
import getServerSideProps from "@/app/api/search";
import Layout from "@/components/Layout";
import NotSearchResult from "@/components/NotSearchResult/NotSearchResult";
import { ISearch } from "../../types/types";
import Products from "@/components/Products";
import { Container } from "@mui/material";

const Search = ({ searchData }: ISearch) => {
  return (
    <Layout>
      <Container maxWidth="lg">
        {searchData ? <Products products={searchData} /> : <NotSearchResult />}
      </Container>
    </Layout>
  );
};

export default Search;

export { getServerSideProps };
