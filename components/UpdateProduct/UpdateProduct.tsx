import admin_texts from "@/constants/admin";
import { TextField, Typography, Button, Divider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ILogo_url, IProduct } from "@/pages/types";
import getJwtToken from "@/utils/getJwtToken";
import CloseCard from "../CloseCard/CloseCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { API_BASE_URL } from "@/tmp/endpoints";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import useNotification from "@/hooks/useNotification";
import admin_messages from "@/messages/admin";

const UpdateProduct = () => {
  const { displayNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [initialProductData, setInitialProductData] = useState<IProduct | null>(
    null
  );
  const [productNameAM, setProductNameAM] = useState("");
  const [productNameRU, setProductNameRU] = useState("");
  const [productNameUS, setProductNameUS] = useState("");
  const [productDescriptionAM, setProductDescriptionAM] = useState("");
  const [productDescriptionRU, setProductDescriptionRU] = useState("");
  const [productDescriptionUS, setProductDescriptionUS] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [productImages, setProductImages] = useState<ILogo_url[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [addedImages, setAddedImages] = useState<File[]>([]);

  const { success, error } = admin_messages.updateProduct;
  const handleSelectProduct = useCallback(
    (product: IProduct) => {
      setSelectedProduct(product);
      setInitialProductData(product);
      setProductNameAM(product.product_name.am);
      setProductNameRU(product.product_name.ru);
      setProductNameUS(product.product_name.us);
      setProductDescriptionAM(product.description.am);
      setProductDescriptionRU(product.description.ru);
      setProductDescriptionUS(product.description.us);
      setProductPrice(product.price);
      setEmail(product.contactInfo.email || "");
      setPhoneNumber(product.contactInfo.phoneNumber);
      setFullName(product.contactInfo.fullname);
      setProductImages(product.images);
    },
    [setSelectedProduct]
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log("Failed fetch categories", err);
      }
    })();
  }, []);

  const handleUpdateProduct = async () => {
    if (selectedProduct && initialProductData) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        if (productNameAM !== initialProductData.product_name.am) {
          formData.append("product_name[am]", productNameAM);
        }
        if (productNameRU !== initialProductData.product_name.ru) {
          formData.append("product_name[ru]", productNameRU);
        }
        if (productNameUS !== initialProductData.product_name.us) {
          formData.append("product_name[us]", productNameUS);
        }
        if (productDescriptionAM !== initialProductData.description.am) {
          formData.append("description[am]", productDescriptionAM);
        }
        if (productDescriptionRU !== initialProductData.description.ru) {
          formData.append("description[ru]", productDescriptionRU);
        }
        if (productDescriptionUS !== initialProductData.description.us) {
          formData.append("description[us]", productDescriptionUS);
        }
        if (productPrice !== initialProductData.price) {
          formData.append("price", productPrice);
        }
        if (email !== initialProductData.contactInfo.email) {
          formData.append("contactInfo[email]", email);
        }
        if (phoneNumber !== initialProductData.contactInfo.phoneNumber) {
          formData.append("contactInfo[phoneNumber]", phoneNumber);
        }
        if (fullName !== initialProductData.contactInfo.fullname) {
          formData.append("contactInfo[fullname]", fullName);
        }
        if (deletedImages.length) {
          deletedImages.forEach((imageId) => {
            formData.append("imageIds[]", imageId);
          });
        }
        if (addedImages.length) {
          addedImages.forEach((file: any) => {
            formData.append(`images`, file, file.name);
          });
        }

        if (formData.getAll.length === 0) {
          return;
        }
        const TOKEN = getJwtToken();

        await fetch(`${API_BASE_URL}/products/${selectedProduct.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          body: formData,
        });

        displayNotification({ message: success });
        setIsLoading(false);
      } catch (err) {
        displayNotification({ message: error, type: "error" });
        setIsLoading(false);
      }
    }
  };

  const handleImageCloseClick = useCallback(
    (idToRemove: string) => {
      setDeletedImages((prev) => [...prev, idToRemove]);
      setProductImages((prevImages) =>
        prevImages.filter((image) => image.id !== idToRemove)
      );
    },
    [setProductImages]
  );

  const handleLogoInputChange = useCallback(
    (e) => {
      const newFiles = Array.from(e.target.files);
      setAddedImages([...(newFiles as File[])]);
    },
    [setAddedImages]
  );

  const handleRemoveAddedImage = (indexToRemove: number) => {
    setAddedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return products ? (
    <div className="w-full flex flex-col items-center gap-10 p-5">
      <div>
        <Typography fontSize={30}>
          {admin_texts.titles.updateProduct}
        </Typography>
      </div>
      <div
        className="flex flex-wrap gap-10 overflow-scroll"
        style={{ maxHeight: "50vh" }}
      >
        {products.map((product: IProduct) => (
          <>
            <div
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              className="p-10 flex items-center cursor-pointer rounded-xl border-2 border-blue-400 max-h-40"
              style={{
                backgroundColor:
                  selectedProduct?.id === product.id ? "#81B622" : "",
              }}
            >
              <img height={100} width={100} src={product.images[0]?.url} />
            </div>
          </>
        ))}
      </div>
      {selectedProduct && (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-5">
            <Typography fontSize={20}>
              {admin_texts.titles.updateProductName}
            </Typography>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productName.am}
              </Typography>
              <TextField
                className="w-full"
                value={productNameAM}
                onChange={(e) => setProductNameAM(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productName.ru}
              </Typography>
              <TextField
                className="w-full"
                value={productNameRU}
                onChange={(e) => setProductNameRU(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productName.us}
              </Typography>
              <TextField
                className="w-full"
                value={productNameUS}
                onChange={(e) => setProductNameUS(e.target.value)}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 30 }} />
          <div className="w-full flex flex-col gap-5">
            <Typography fontSize={20}>
              {admin_texts.titles.updateProductDescription}
            </Typography>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productDescription.am}
              </Typography>
              <TextField
                className="w-full"
                value={productDescriptionAM}
                onChange={(e) => setProductDescriptionAM(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productDescription.ru}
              </Typography>
              <TextField
                className="w-full"
                value={productDescriptionRU}
                onChange={(e) => setProductDescriptionRU(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.productDescription.us}
              </Typography>
              <TextField
                className="w-full"
                value={productDescriptionUS}
                onChange={(e) => setProductDescriptionUS(e.target.value)}
              />
            </div>
          </div>
          <Divider style={{ marginTop: 30 }} />
          <div className="w-full flex flex-col gap-5">
            <Typography fontSize={20}>
              {admin_texts.titles.updateProductPrice}
            </Typography>
            <TextField
              className="w-full"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <Divider style={{ marginTop: 30 }} />
          <div className="w-full flex flex-col gap-5">
            <Typography fontSize={20}>
              {admin_texts.titles.updateContactInfo}
            </Typography>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.contactInfo.email}
              </Typography>
              <TextField
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.contactInfo.phoneNumber}
              </Typography>
              <TextField
                className="w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Typography className="text-blue-400">
                {admin_texts.placeholders.contactInfo.fullName}
              </Typography>
              <TextField
                className="w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            {productImages.map(({ url, id }) => (
              <CloseCard
                url={url}
                closeCallback={() => handleImageCloseClick(id)}
              />
            ))}
            {addedImages.map((file, index) => (
              <CloseCard
                url={URL.createObjectURL(file)}
                closeCallback={() => handleRemoveAddedImage(index)}
              />
            ))}
          </div>
          <Button
            className="h-1/2 "
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            {admin_texts.buttons.uploadImages}
            <input
              accept="image/*"
              multiple
              type="file"
              style={{ display: "none" }}
              onChange={handleLogoInputChange}
            />
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={handleUpdateProduct}
            variant="contained"
          >
            {admin_texts.buttons.updateProduct}
          </LoadingButton>
        </div>
      )}
    </div>
  ) : (
    <CircularProgress />
  );
};

export default UpdateProduct;
