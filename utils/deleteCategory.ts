import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

const deleteCategory = async (categoryId: string) => {
  const TOKEN = getJwtToken();

  try {
    const res = await fetch(`${API_BASE_URL}/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return await res.json();
  } catch (err) {
    return err;
  }
};

export default deleteCategory;
