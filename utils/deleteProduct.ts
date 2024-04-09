import getJwtToken from "./getJwtToken";

const deleteProduct = async (id: string) => {
  const TOKEN = getJwtToken();
  try {
    const res = await fetch(`http://localhost:3002/products/${id}`, {
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
