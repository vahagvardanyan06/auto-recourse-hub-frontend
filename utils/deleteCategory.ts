import getJwtToken from "./getJwtToken";

const deleteCategory = async (categoryId: string) => {
  const TOKEN = getJwtToken();

  try {
    const res = await fetch(`http://localhost:3002/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCategory;
