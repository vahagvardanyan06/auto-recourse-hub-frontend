export default interface IProductType {
  src: string;
  type: string;
  price: string;
  phoneNumber?: string;
  onContactButtonClick?: () => void;
  id?: string;
  category_name: string;
  key?: string;
}
