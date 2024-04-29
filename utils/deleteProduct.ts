import getJwtToken from "./getJwtToken";
import { API_URL } from "@/constants/admin";

const deleteProduct = async (id: string) => {
  const TOKEN = getJwtToken();
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.json();
  } catch (err) {
    return err;
  }
};

export default deleteProduct;
