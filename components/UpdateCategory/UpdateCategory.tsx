import React, { useCallback, useEffect, useState } from "react";
import {
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { ICategory } from "@/types/types";
import admin_texts, { API_URL } from "@/constants/admin";
import CloseCard from "../CloseCard/CloseCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import getJwtToken from "@/utils/getJwtToken";
import useNotification from "@/hooks/useNotification";
import admin_messages from "@/messages/admin";

const UpdateCategory = () => {
  const { displayNotification } = useNotification();

  const [selectValue, setSelectValue] = useState("");
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [updatedtLogoFile, setUpdatedLogoFile] = useState<File | null>(null);

  const { success, error } = admin_messages.updateCategory;

  useEffect(() => {
    (async () => {
      const categories_res = await fetch(`${API_URL}/category`);
      const categories_result = await categories_res.json();

      setCategories(categories_result);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (selectValue) {
      (async () => {
        const category_res = await fetch(
          `${API_URL}/category/name/${selectValue}`
        );
        const category = await category_res.json();

        setSelectedCategory(category);
        if (!updatedtLogoFile) {
          setLogoUrl(category.logo_url.url);
        }
      })();
    }
  }, [selectValue, updatedtLogoFile]);

  const handleSelectChange = useCallback((event: SelectChangeEvent) => {
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
          formData.append("logo", updatedtLogoFile);
        }

        const TOKEN = getJwtToken();
        const response = await fetch(
          `${API_URL}/category/${selectedCategory.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (data?.success) {
          displayNotification({ message: success });
          setIsLoading(false);
        }
      } catch (err) {
        displayNotification({ message: error, type: "error" });
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
