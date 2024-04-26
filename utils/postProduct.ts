import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

const postProduct = async (data: any) => {
  const TOKEN = getJwtToken();

  console.log(data);

  try {
    const formData = new FormData();
    formData.append("product_name[am]", data.productNameAM);
    formData.append("product_name[ru]", data.productNameRU);
    formData.append("product_name[us]", data.productNameUS);
    formData.append("description[am]", data.productDescriptionAM);
    formData.append("description[ru]", data.productDescriptionRU);
    formData.append("description[us]", data.productDescriptionUS);
    formData.append("price", data.price);
    formData.append("categoryId", data.selectedCategoryId);
    formData.append("contactInfo[phoneNumber]", data.phoneNumber);
    formData.append("contactInfo[email]", data.email);
    formData.append("contactInfo[fullname]", data.fullName);
    formData.append("topSale", String(data.isTopSale));

    if (data.imagesFiles) {
      Array.from(data.imagesFiles).forEach((file: any) => {
        formData.append(`images`, file, file.name);
      });
    }

    console.log("data.selectedCategoryId", data.selectedCategoryId);

    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export default postProduct;
