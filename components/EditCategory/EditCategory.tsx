import admin_texts from "@/constants/admin";
import { Button, TextField, Typography, styled } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UpdateCategory = () => {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultCategory, setResultCategory] = useState(null);

  const handleCategoryClick = useCallback((category: any) => {
    setSelectedCategory(category);
    setResultCategory(category);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3002/category`);
        const categories_response = await res.json();

        setCategories(categories_response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removePreviewImage = useCallback(() => {
    setPreviewImage(null);
  }, [setPreviewImage]);

  const handleInputChange = useCallback(
    (e: any, language: string) => {
      setResultCategory((prev: any) => ({
        ...prev,
        category_name: {
          ...prev.category_name,
          [language]: e.target.value,
        },
      }));
    },
    [setResultCategory]
  );

  useEffect(() => {
    console.log("resultCategory", resultCategory);
  }, [resultCategory]);

  const handleForSubmit = useCallback(() => {});

  return (
    categories && (
      <div className="w-full gap-5 p-5 flex flex-col items-center">
        <Typography fontSize={30}>{admin_texts.titles.editCategory}</Typography>
        <form
          className="w-full flex flex-col gap-5 items-center"
          onSubmit={handleForSubmit}
        >
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
          {selectedCategory && (
            <>
              <div className="w-full flex flex-col gap-5">
                <Typography className="text-blue-400">
                  {admin_texts.titles.editCategoryName}
                </Typography>
                <TextField
                  className="w-full"
                  value={selectedCategory.category_name["us"]}
                  onChange={(e) => handleInputChange(e, "us")}
                />
                <TextField
                  className="w-full"
                  value={selectedCategory.category_name["ru"]}
                />
                <TextField
                  className="w-full"
                  value={selectedCategory.category_name["am"]}
                />
              </div>
              <div className="w-full flex flex-col gap-5">
                <Typography className="text-blue-400">
                  {admin_texts.titles.editCategoryLogo}
                </Typography>
                {previewImage && (
                  <div className="flex justify-center items-start gap-2 flex-col">
                    <Button onClick={removePreviewImage}>
                      <CloseIcon />
                    </Button>
                    <img
                      src={previewImage}
                      alt="Uploaded"
                      className="max-w-full h-auto"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
                <div>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    {admin_texts.buttons.uploadLogo}
                    <VisuallyHiddenInput
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>
                </div>
              </div>
            </>
          )}
          <LoadingButton variant="contained" className="w-full">
            {admin_texts.buttons.editCategory}
          </LoadingButton>
        </form>
      </div>
    )
  );
};

export default UpdateCategory;
