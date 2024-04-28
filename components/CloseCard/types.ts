interface ICloseCard {
  alt?: string;
  url: string;
  closeCallback?: () => void;
  key?: string;
}

export default ICloseCard;
