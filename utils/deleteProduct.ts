import { API_BASE_URL } from "@/tmp/endpoints";
import getJwtToken from "./getJwtToken";

const deleteProduct = async (id: string) => {
  const TOKEN = getJwtToken();
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default deleteProduct;
