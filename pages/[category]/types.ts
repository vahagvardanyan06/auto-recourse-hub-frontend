import { ILanguages, IProduct } from "../types";

interface ICategory {
  data: {
    category_name: ILanguages;
    id: string;
    logo_url: string;
    products: IProduct[];
  };
}
export default ICategory;
