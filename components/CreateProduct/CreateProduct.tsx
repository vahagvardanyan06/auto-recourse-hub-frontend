import React, { useCallback, useEffect, useState } from "react";
import admin_texts from "@/constants/admin";
import {
  TextField,
  Typography,
  Checkbox,
  Button,
  styled,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import postProduct from "@/utils/postProduct";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

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

const CreateProduct = () => {
  const { reload } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | string>(
    null
  );
  const [productNameAM, setProductNameAM] = useState("");
  const [productNameRU, setProductNameRU] = useState("");
  const [productNameUS, setProductNameUS] = useState("");
  const [productDescriptionAM, setProductDescriptionAM] = useState("");
  const [productDescriptionRU, setProductDescriptionRU] = useState("");
  const [productDescriptionUS, setProductDescriptionUS] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isTopSale, setIsTopSale] = useState(false);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3002/category");
        const categories_res = await res.json();
        setCategories(categories_res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSelectCategoryChange = useCallback(
    (id: string) => {
      setSelectedCategoryId(id);
    },
    [setSelectedCategoryId]
  );

  const handleFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const res = await postProduct({
          productNameAM,
          productNameRU,
          productNameUS,
          productDescriptionAM,
          productDescriptionUS,
          productDescriptionRU,
          price,
          phoneNumber,
          email,
          fullName,
          isTopSale,
          selectedCategoryId,
          imagesFiles,
        });
        reload();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      productNameAM,
      productNameRU,
      productNameUS,
      productDescriptionAM,
      productDescriptionRU,
      productDescriptionUS,
      price,
      selectedCategoryId,
      phoneNumber,
      fullName,
      email,
      isTopSale,
      imagesFiles,
    ]
  );

  const handleImageInputChange = useCallback(
    (e: any) => {
      const newFiles = Array.from(e.target.files);
      setImagesFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);

      const previews: File[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        previews.push(URL.createObjectURL(newFiles[i]));
      }
      setImagePreviews((prevPreviews: string[]) => [
        ...prevPreviews,
        ...previews,
      ]);
    },
    [setImagesFiles, setImagePreviews]
  );
  const removePreviewImage = useCallback(
    (indexToRemove: number) => {
      setImagePreviews((prevPreviews) =>
        prevPreviews.filter((_, index) => index !== indexToRemove)
      );
      setImagesFiles((prevImageFiles) =>
        Array.from(prevImageFiles).filter((_, index) => index !== indexToRemove)
      );
    },
    [imagePreviews, setImagePreviews, imagesFiles, setImagesFiles]
  );

  useEffect(() => {
    console.log(imagePreviews);
  }, [imagePreviews]);

  return (
    categories && (
      <>
        <form
          onSubmit={handleFormSubmit}
          className="flex justify-center flex-col gap-5 w-full p-5"
        >
          <div className="w-full flex justify-center items-center flex-col gap-5">
            <Typography fontSize={30}>
              {admin_texts.titles.creteProduct}
            </Typography>
            <div className="w-full flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.titles.createProductName}
              </Typography>
              <div className="flex flex-col gap-5">
                <TextField
                  placeholder={admin_texts.placeholders.productName.am}
                  value={productNameAM}
                  onChange={(e) => setProductNameAM(e.target.value)}
                  required
                />
                <TextField
                  placeholder={admin_texts.placeholders.productName.ru}
                  value={productNameRU}
                  onChange={(e) => setProductNameRU(e.target.value)}
                  required
                />
                <TextField
                  placeholder={admin_texts.placeholders.productName.us}
                  value={productNameUS}
                  onChange={(e) => setProductNameUS(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.createProductDescription}
            </Typography>
            <div className="flex flex-col gap-5">
              <TextField
                placeholder={admin_texts.placeholders.productDescription.am}
                value={productDescriptionAM}
                onChange={(e) => setProductDescriptionAM(e.target.value)}
                required
              />
              <TextField
                placeholder={admin_texts.placeholders.productDescription.ru}
                value={productDescriptionRU}
                onChange={(e) => setProductDescriptionRU(e.target.value)}
                required
              />
              <TextField
                placeholder={admin_texts.placeholders.productDescription.us}
                value={productDescriptionUS}
                onChange={(e) => setProductDescriptionUS(e.target.value)}
                required
              />
            </div>
          </div>
          <div className=" w-full flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.createPrice}
            </Typography>
            <div className="w-full">
              <TextField
                className="w-full"
                placeholder={admin_texts.placeholders.price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.createContactInfo}
            </Typography>
            <div className="flex flex-col gap-5">
              <TextField
                placeholder={admin_texts.placeholders.contactInfo.phoneNumber}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                type="tel"
              />
              <TextField
                placeholder={admin_texts.placeholders.contactInfo.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
              <TextField
                placeholder={admin_texts.placeholders.contactInfo.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.topSale}
            </Typography>
            <div>
              <Checkbox
                checked={isTopSale}
                onChange={(e) => setIsTopSale(e.target.checked)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.uploadImages}
            </Typography>
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
                multiple
                onChange={handleImageInputChange}
                required
              />
            </Button>
            <div className="flex gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Button
                    onClick={() => removePreviewImage(index)}
                    className="absolute top-0 right-0"
                  >
                    <CloseIcon />
                  </Button>
                  <img
                    key={index}
                    src={preview}
                    alt="Uploaded"
                    className="max-w-full h-auto"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <Typography className="text-blue-400">
              {admin_texts.titles.selectCtaegory}
            </Typography>
            <Select
              className="w-full"
              placeholder={admin_texts.placeholders.selectCategory}
              onChange={(e) =>
                handleSelectCategoryChange(e.target.value as string)
              }
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name.us}
                </MenuItem>
              ))}
            </Select>
          </div>
          <LoadingButton type="submit" loading={isLoading} variant="contained">
            {admin_texts.buttons.createProduct}
          </LoadingButton>
        </form>
      </>
    )
  );
};

export default CreateProduct;
