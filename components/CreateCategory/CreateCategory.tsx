import React, { ChangeEvent, useCallback, useState } from "react";
import { TextField, Typography, Button, styled } from "@mui/material";
import admin_texts from "@/constants/admin";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import postCategory, { IOptions } from "@/utils/postCategory";
import CloseCard from "../CloseCard/CloseCard";
import useNotification from "@/hooks/useNotification";
import admin_messages from "@/messages/admin";

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

const CreateCategory = () => {
  const { displayNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [categoryNames, setCategoryNames] = useState({
    category_name: {
      am: "",
      ru: "",
      us: "",
    },
  });

  const { success, error } = admin_messages.createCategory;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePreviewImage = useCallback(() => {
    setPreviewImage(null);
  }, [setPreviewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      ...categoryNames,
      logo: selectedFile,
    };

    const res = await postCategory(data);

    if (res.success) {
      displayNotification({ message: success });
    } else {
      displayNotification({ message: error, type: "error" });
    }
    setIsLoading(false);
  };

  const handleNameChange = (e, lang) => {
    const { value } = e.target;

    setCategoryNames((prevState) => ({
      ...prevState,
      category_name: {
        ...prevState.category_name,
        [lang]: value,
      },
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center flex-col gap-5 w-full p-5"
    >
      <div className="w-full flex justify-center items-center">
        <Typography fontSize={30}>
          {admin_texts.titles.createCategory}
        </Typography>
      </div>
      <div className="flex flex-col gap-5">
        <Typography className="text-blue-400">
          {admin_texts.titles.createCategoryName}
        </Typography>
        <div className="flex flex-col gap-3">
          <TextField
            className="w-full"
            placeholder={admin_texts.placeholders.categoryName.am}
            value={categoryNames.am}
            onChange={(e) => handleNameChange(e, "am")}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <TextField
            className="w-full"
            placeholder={admin_texts.placeholders.categoryName.ru}
            value={categoryNames.ru}
            onChange={(e) => handleNameChange(e, "ru")}
            required
          />
        </div>{" "}
        <div className="flex flex-col gap-3">
          <TextField
            className="w-full"
            placeholder={admin_texts.placeholders.categoryName.us}
            value={categoryNames.us}
            onChange={(e) => handleNameChange(e, "us")}
            required
          />
        </div>
      </div>
      {previewImage && (
        <CloseCard url={previewImage} closeCallback={removePreviewImage} />
      )}
      <div>
        <Button
          className="w-full"
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {admin_texts.buttons.uploadLogo}
          <VisuallyHiddenInput
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            required
          />
        </Button>
      </div>

      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        className="w-full bg-green-500"
      >
        {admin_texts.buttons.createCategory}
      </LoadingButton>
    </form>
  );
};

export default CreateCategory;
