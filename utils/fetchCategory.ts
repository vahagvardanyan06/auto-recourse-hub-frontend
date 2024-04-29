import { API_URL } from "@/constants/admin";

const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/category`);
    const categories_response = await res.json();
    return categories_response;
  } catch (err) {
    console.log("Failed to fecth categories", err);
  }
};

export default fetchCategories;
