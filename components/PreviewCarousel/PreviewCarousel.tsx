import Carousel from "react-material-ui-carousel";
import { useIsMobile } from "@/hooks/useIsMobile";
import IPreviewCarousel from "./types";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const PreviewCarousel = ({ images }: IPreviewCarousel) => {
  const isMobile = useIsMobile();

  return (
    <Carousel
      navButtonsAlwaysVisible
      autoPlay={false}
      NextIcon={<ArrowForwardIosIcon className="fill-gray-400" />}
      PrevIcon={<ArrowBackIosIcon className="fill-gray-400" />}
    >
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
