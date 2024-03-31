import { IProduct } from "@/pages/types";

const getImagesFromProducts = (products: IProduct[]) => {
  const urls: string[] = [];

  products.forEach((item) => {
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((url: string) => {
        if (typeof url === "string") {
          urls.push(url);
        }
      });
    }
  });

  return urls;
};

export default getImagesFromProducts;
