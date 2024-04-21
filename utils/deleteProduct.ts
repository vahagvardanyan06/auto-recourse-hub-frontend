import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

const deleteProduct = async (id: string) => {
  const TOKEN = getJwtToken();
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default deleteProduct;
