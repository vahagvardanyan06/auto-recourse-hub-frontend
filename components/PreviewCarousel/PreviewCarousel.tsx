import Carousel from "react-material-ui-carousel";
import { useIsMobile } from "@/hooks/useIsMobile";
import IPreviewCarousel from "./types";

const PreviewCarousel = ({ images }: IPreviewCarousel) => {
  const isMobile = useIsMobile();
  console.log("prview images", images);

  return (
    <Carousel stopAutoPlayOnHover>
      {images.map((url) => (
        <div className="w-full flex items-center justify-center">
          <img
            style={{ maxHeight: isMobile ? 220 : 550 }}
            src={url}
            className="object-contain"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default PreviewCarousel;
