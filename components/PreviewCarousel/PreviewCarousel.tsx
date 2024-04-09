import Carousel from "react-material-ui-carousel";
import { useIsMobile } from "@/hooks/useIsMobile";
import IPreviewCarousel from "./types";

const PreviewCarousel = ({ images }: IPreviewCarousel) => {
  const isMobile = useIsMobile();
  console.log("prview images", images);

  return (
    <Carousel stopAutoPlayOnHover>
      {images.map((url) => (
        <img
          style={{ maxHeight: isMobile ? 220 : 550 }}
          src={url}
          className="object-contain, w-full"
        />
      ))}
    </Carousel>
  );
};

export default PreviewCarousel;
