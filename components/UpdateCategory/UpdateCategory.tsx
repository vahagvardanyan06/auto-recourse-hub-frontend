import React, { useCallback, useEffect, useState } from "react";
import {
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { ICategory } from "@/pages/types";
import admin_texts from "@/constants/admin";
import CloseCard from "../CloseCard/CloseCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import getJwtToken from "@/utils/getJwtToken";
import { useRouter } from "next/router";
import { API_BASE_URL } from "@/tmp/endpoints";

const UpdateCategory = () => {
  const { reload } = useRouter();

  const [selectValue, setSelectValue] = useState("");
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [updatedtLogoFile, setUpdatedLogoFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const categories_res = await fetch(`${API_BASE_URL}/category`);
      const categories_result = await categories_res.json();
      console.log(categories_result);

      setCategories(categories_result);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (selectValue) {
      (async () => {
        const category_res = await fetch(
          `${API_BASE_URL}/category/name/${selectValue}`
        );
        const category = await category_res.json();
        console.log(category);

        setSelectedCategory(category);
        if (!updatedtLogoFile) {
          setLogoUrl(category.logo_url.url);
        }
      })();
    }
  }, [selectValue, updatedtLogoFile]);

  const handleSelectChange = useCallback((event: any) => {
    setSelectValue(event.target.value);
  }, []);

  const handleLogoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUpdatedLogoFile(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    if (selectedCategory) {
      try {
        const initialCategory = categories?.find(
          (category) => category.id === selectedCategory.id
        );
        const formData = new FormData();

        if (
          initialCategory &&
          initialCategory.category_name.ru !== selectedCategory.category_name.ru
        ) {
          formData.append(
            "category_name[ru]",
            selectedCategory.category_name.ru
          );
        }
        if (
          initialCategory &&
          initialCategory.category_name.am !== selectedCategory.category_name.am
        ) {
          formData.append(
            "category_name[am]",
            selectedCategory.category_name.am
          );
        }
        if (
          initialCategory &&
          initialCategory.category_name.us !== selectedCategory.category_name.us
        ) {
          formData.append(
            "category_name[us]",
            selectedCategory.category_name.us
          );
        }
        if (updatedtLogoFile) {
          console.log(updatedtLogoFile);

          formData.append("logo", updatedtLogoFile);
        }

        const TOKEN = getJwtToken();
        const response = await fetch(
          `${API_BASE_URL}/category/${selectedCategory.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            body: formData,
          }
        );

        const data = await response.json();
        console.log("data--->", data);

        if (data.status === 200) {
          reload();
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  return categories && !isLoading ? (
    <div className="w-full p-5 flex flex-col gap-5">
      <div className="w-full flex justify-center">
        <Typography fontSize={30}>
          {admin_texts.titles.updateCategory}
        </Typography>
      </div>
      <div className="flex flex-col gap-5">
        <Typography className="text-blue-400">
          {admin_texts.titles.selectCtaegory}
        </Typography>
        <Select
          onChange={handleSelectChange}
          className="w-full"
          value={selectValue}
        >
          {categories &&
            categories.map((category: ICategory) => (
              <MenuItem value={category.name} key={category.id}>
                {category.name}
              </MenuItem>
            ))}
        </Select>
      </div>
      <Divider />
      {selectedCategory && (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.placeholders.categoryName.ru}
            </Typography>
            <TextField
              value={selectedCategory.category_name.ru}
              className="w-full"
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  category_name: {
                    ...selectedCategory.category_name,
                    ru: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="w-full flex flex-col gap-5 ">
            <Typography className="text-blue-400">
              {admin_texts.placeholders.categoryName.am}
            </Typography>
            <TextField
              value={selectedCategory.category_name.am}
              className="w-full"
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  category_name: {
                    ...selectedCategory.category_name,
                    am: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.placeholders.categoryName.us}
            </Typography>
            <TextField
              value={selectedCategory.category_name.us}
              className="w-full"
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  category_name: {
                    ...selectedCategory.category_name,
                    us: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      )}
      {selectedCategory && (
        <>
          <Divider />

          <CloseCard url={logoUrl as string} />
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            {admin_texts.buttons.uploadLogo}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleLogoInputChange}
            />
          </Button>
          <Button onClick={handleUpdate} variant="contained">
            {admin_texts.buttons.updateCategory}
          </Button>
        </>
      )}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default UpdateCategory;
