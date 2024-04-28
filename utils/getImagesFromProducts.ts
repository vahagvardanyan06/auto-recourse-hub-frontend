import { IProduct } from "@/types/types";

const getImagesFromProducts = (products: IProduct[]) => {
  const urls: string[] = [];

  products.forEach((item) => {
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach(({ url }: { url: string }) => {
        if (typeof url === "string") {
          urls.push(url);
        }
      });
    }
  });

  return urls;
};

export default getImagesFromProducts;
