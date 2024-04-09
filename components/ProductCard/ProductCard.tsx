import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import IProductType from "./types";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import productCardText from "@/messages/productCard";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const ProductCard = ({
  src,
  type,
  price,
  phoneNumber,
  onContactButtonClick,
  id,
  category_name,
}: IProductType) => {
  const language = useSelector(selectLanguage);
  const { push } = useRouter();

  const handleItemClick = useCallback(() => {
    push(`/${category_name}/${id}`);
  }, []);
  useEffect(() => {
    console.log(
      "Log :::  :::",
      src,
      type,
      price,
      phoneNumber,
      onContactButtonClick,
      id,
      category_name
    );
  }, []);
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card className="h-full flex flex-col justify-between cursor-pointer">
        <CardMedia
          component="img"
          height="200"
          image={src}
          alt={type}
          onClick={handleItemClick}
        />
        <div className="ml-2 flex flex-col flex-wrap">
          <Typography className="w-fit font-inter text-xs font-medium leading-7 tracking-normal text-center capitalize">
            {type}
          </Typography>
          <Typography className="text-yellow-400">{price}</Typography>
        </div>
        <a href={`tel:${phoneNumber}`} className="w-full">
          <Button
            className="bg-yellow-200 border-none hover:border-none w-full"
            variant="outlined"
            startIcon={<CallIcon />}
            onClick={onContactButtonClick}
          >
            <Typography className="w-fit font-inter  font-medium leading-7 tracking-normal text-center capitalize">
              {productCardText.contact[language]}
            </Typography>
          </Button>
        </a>
      </Card>
    </Grid>
  );
};

export default ProductCard;
