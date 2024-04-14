import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

const deleteCategory = async (categoryId: string) => {
  const TOKEN = getJwtToken();

  try {
    const res = await fetch(`${API_BASE_URL}/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    console.log(res);

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export default deleteCategory;
