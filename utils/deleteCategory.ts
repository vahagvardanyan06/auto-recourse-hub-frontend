import getJwtToken from "./getJwtToken";
import { API_URL } from "@/constants/admin";

const deleteCategory = async (categoryId: string) => {
  const TOKEN = getJwtToken();

  try {
    const res = await fetch(`${API_URL}/category/${categoryId}`, {
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
