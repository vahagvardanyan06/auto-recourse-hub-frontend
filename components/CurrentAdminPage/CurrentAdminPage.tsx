import React, { useMemo } from "react";
import ICurrentAdminPage from "./types";
import { adminPages } from "@/constants/admin";
import CreateCategory from "../CreateCategory";
import DeleteCategory from "../DeleteCategory";
import CreateProduct from "../CreateProduct";
import DeleteProduct from "../DeleteProduct";
import UpdateCategory from "../UpdateCategory";
import UpdateProduct from "../UpdateProduct";

const RenderCurrentAdminPage = ({ activePage }: ICurrentAdminPage) => {
  const renderCurrentAdminPage = (page: string) => {
    switch (page) {
      case adminPages.CREATE_CATEGORY:
        return <CreateCategory />;
      case adminPages.DELETE_CATEGORY:
        return <DeleteCategory />;
      case adminPages.CREATE_PRODUCT:
        return <CreateProduct />;
      case adminPages.DELETE_PRODUCT:
        return <DeleteProduct />;
      case adminPages.UPDATE_CATEGORY:
        return <UpdateCategory />;
      case adminPages.UPDATE_PRODUCT:
        return <UpdateProduct />;
    }
  };

  return useMemo(() => renderCurrentAdminPage(activePage), [activePage]);
};

export default RenderCurrentAdminPage;
