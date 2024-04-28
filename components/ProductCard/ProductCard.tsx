import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import IProductType from "./types";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import productCardText from "@/messages/productCard";
import { useCallback } from "react";
import { useRouter } from "next/router";
import React from "react";

const ProductCard = ({
  src,
  type,
  price,
  phoneNumber,
  onContactButtonClick,
  id,
  category_name,
  key,
}: IProductType) => {
  const language = useSelector(selectLanguage);
  const { push } = useRouter();

  const handleItemClick = useCallback(() => {
    push(`/${category_name}/${id}`);
  }, []);

  return (
    <Grid item xs={2} sm={4} md={4} key={key}>
      <Card className="h-full flex flex-col justify-between cursor-pointer">
        <div
          onClick={handleItemClick}
          className="flex flex-col justify-between h-full"
        >
          {src && (
            <CardMedia
              component="img"
              height="200px"
              style={{ maxHeight: "200px", objectFit: "contain" }}
              image={src}
              alt={type}
            />
          )}
          <div className="ml-2 flex flex-col flex-wrap">
            <Typography className="w-fit font-inter text-xs font-medium leading-7 tracking-normal text-center capitalize">
              {type}
            </Typography>
            <Typography className="text-yellow-400">{price}</Typography>
          </div>
        </div>

        <a href={`tel:${phoneNumber}`} className="w-full">
          <Button
            className="bg-yellow-400 border-none hover:border-none w-full"
            variant="outlined"
            startIcon={<CallIcon className="fill-red-500" />}
            onClick={onContactButtonClick}
          >
            <Typography className="w-fit font-inter  font-medium leading-7 tracking-normal text-center capitalize text-red-500">
              {productCardText.contact[language]}
            </Typography>
          </Button>
        </a>
      </Card>
    </Grid>
  );
};

export default ProductCard;
