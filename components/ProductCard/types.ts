import { IProduct } from "@/pages/types";

export default interface IProductType {
  src: string;
  type: string;
  price: string;
  phoneNumber?: string;
  onContactButtonClick?: () => void;
}
