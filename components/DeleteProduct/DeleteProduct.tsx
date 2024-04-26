import {
  Button,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import deleteProduct from "@/utils/deleteProduct";
import admin_texts from "@/constants/admin";
import CloseCard from "../CloseCard/CloseCard";
import { useRouter } from "next/router";
import { ICategory, IProduct } from "@/pages/types";
import { API_BASE_URL } from "@/tmp/endpoints";
import useNotification from "@/hooks/useNotification";
import admin_messages from "@/messages/admin";

const DeleteProduct = () => {
  const { displayNotification } = useNotification();

  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [currentProdcuts, setCurrentProducts] = useState<IProduct[] | null>(
    null
  );
  const [selectValue, setSelectValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { success, error } = admin_messages.deleteProduct;

  useEffect(() => {
    (async () => {
      const categories_res = await fetch(`${API_BASE_URL}/category`);
      const result_categories = await categories_res.json();

      setCategories(result_categories);
    })();
  });

  useEffect(() => {
    if (selectValue && !isLoading) {
      (async () => {
        const products_res = await fetch(
          `${API_BASE_URL}/category/name/${selectValue}`
        );
        const products = await products_res.json();

        setCurrentProducts(products.products);
      })();
    }
  }, [selectValue, isLoading]);

  const handleSelectChange = useCallback((event: any) => {
    setSelectValue(event.target.value);
  }, []);

  const handleProductDelete = useCallback(async (id: string) => {
    setIsLoading(!isLoading);
    const res = await deleteProduct(id);

    if (res?.success) {
      displayNotification({ message: success });
    } else {
      displayNotification({ message: error, type: "error" });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("isloading", isLoading);
  }, [isLoading]);

  return categories && !isLoading ? (
    <form className="p-5 flex flex-col gap-5 w-full items-center">
      <Typography fontSize={30}>{admin_texts.titles.deleteProduct}</Typography>
      <div className="flex w-full flex-col gap-5">
        <Typography className="text-blue-400">
          {admin_texts.placeholders.selectCategory}
        </Typography>
        <Select
          value={selectValue}
          onChange={handleSelectChange}
          className="w-full"
        >
          {categories.map((category) => (
            <MenuItem value={category.name}>{category.name}</MenuItem>
          ))}
        </Select>
        {currentProdcuts && (
          <div className="flex flex-wrap gap-5 ">
            {currentProdcuts &&
              currentProdcuts.map((product) => (
                <CloseCard
                  url={product.images[0]?.url}
                  closeCallback={() => handleProductDelete(product.id)}
                />
              ))}
          </div>
        )}
      </div>
    </form>
  ) : (
    <CircularProgress />
  );
};

export default DeleteProduct;
