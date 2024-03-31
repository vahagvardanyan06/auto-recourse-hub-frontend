interface IApp {
  categories: ICategory[];
  topProducts: IProduct[];
}

export interface ICategory {
  category_name: string;
  id: string;
  logo_url: string;
  products: IProduct[];
}

export interface IProduct {
  contactInfo: IContactInfo;
  description: ILanguages;
  images: string[];
  price: string;
  product_name: string;
  topSale: boolean;
}

export interface IContactInfo {
  fullname: string;
  phoneNumber: string;
}

export interface ILanguages {
  am: string;
  ru: string;
  us: string;
}

export default IApp;
