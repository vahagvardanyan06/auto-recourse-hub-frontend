interface IApp {
  categories: ICategory[];
  topProducts: IProduct[];
}

export interface ILogo_url {
  id: string;
  url: string;
}

export interface ICategory {
  name: string;
  category_name: ILanguages;
  id: string;
  logo_url: ILogo_url;
  products: IProduct[];
}

export interface IProduct {
  contactInfo: IContactInfo;
  description: ILanguages;
  images: ILogo_url[];
  price: string;
  product_name: ILanguages;
  topSale: boolean;
  id: string;
  _id?: string;
  category_name: string;
}

export interface IContactInfo {
  fullname: string;
  phoneNumber: string;
  email?: string;
}

export interface ILanguages {
  am: string;
  ru: string;
  us: string;
}

export interface ICategoryTypes {
  data: ICategory;
}

export interface ISearch {
  searchData: IProduct[];
}

export interface IProductById {
  categoryData: ICategory;
  productData: IProduct;
}

export default IApp;
