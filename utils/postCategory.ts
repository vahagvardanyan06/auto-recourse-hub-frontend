import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

export interface IOptions {
  category_name: {
    am: string;
    ru: string;
    us: string;
  };
  logo: File;
}

const postCategory = async (options: IOptions) => {
  const TOKEN = getJwtToken();

  const formData = new FormData();
  formData.append("category_name[am]", options.category_name.am);
  formData.append("category_name[ru]", options.category_name.ru);
  formData.append("category_name[us]", options.category_name.us);
  formData.append("logo", options.logo, options.logo.name);

  try {
    const res = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default postCategory;
