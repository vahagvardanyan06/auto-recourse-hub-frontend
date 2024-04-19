import admin_texts from "@/constants/admin";
import useNotification from "@/hooks/useNotification";
import admin_messages from "@/messages/admin";
import { ICategory } from "@/pages/types";
import deleteCategory from "@/utils/deleteCategory";
import fetchCategories from "@/utils/fetchCategory";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const DeleteCategory = () => {
  const { displayNotification } = useNotification();
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { success, error } = admin_messages.deleteCategory;

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const handleDeleteClick = useCallback(async (cat: any) => {
    setIsLoading(true);
    const res = await deleteCategory(cat.id);
    if (res.succes) {
      displayNotification({ message: success });
    } else {
      displayNotification({ message: error, type: "error" });
    }
  }, []);

  useEffect(() => {
    (async () => {
      const categories_res = await fetchCategories();
      setCategories(categories_res);
    })();
  }, []);

  return (
    categories && (
      <div className="w-full p-5 gap-5 flex flex-col items-center">
        <Typography fontSize={30}>
          {admin_texts.titles.deleteCategories}
        </Typography>
        <div className="flex gap-5 flex-wrap">
          {categories.map((category) => (
            <div
              style={{
                background:
                  category.id === selectedCategory?.id
                    ? "rgb(248 113 113)"
                    : "",
                cursor: "pointer",
                padding: 10,
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <Typography>{category.category_name["us"]}</Typography>
              <img height={200} width={200} src={category.logo_url.url} />
            </div>
          ))}
        </div>
        <div className="w-full">
          <LoadingButton
            loading={isLoading}
            disabled={!selectedCategory}
            variant="contained"
            className="w-full bg-red-400"
            onClick={() => handleDeleteClick(selectedCategory)}
          >
            {admin_texts.buttons.deleteCategory}
          </LoadingButton>
        </div>
      </div>
    )
  );
};

export default DeleteCategory;
