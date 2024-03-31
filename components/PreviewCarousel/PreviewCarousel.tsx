import Carousel from "react-material-ui-carousel";
import { useIsMobile } from "@/hooks/useIsMobile";
import IPreviewCarousel from "./types";

const PreviewCarousel = ({ images }: IPreviewCarousel) => {
  const isMobile = useIsMobile();

  return (
    <Carousel stopAutoPlayOnHover>
      {images.map((src: string) => (
        <img
          style={{ height: isMobile ? 220 : 550 }}
          src={src}
          className="object-contain, w-full"
        />
      ))}
    </Carousel>
  );
};

export default PreviewCarousel;
