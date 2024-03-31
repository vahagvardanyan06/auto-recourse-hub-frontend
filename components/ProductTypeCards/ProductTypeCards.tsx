import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import Each from "../Each";
import { useIsMobile } from "@/hooks/useIsMobile";
import IProductTypeCards from "./types";
import { ICategory } from "@/pages/types";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import { useRouter } from "next/router";
import getCategoryName from "@/utils/getCategoryName";

const ProductTypeCards = ({ categories }: IProductTypeCards) => {
  const isMobile = useIsMobile();
  const language = useSelector(selectLanguage);
  const { push } = useRouter();

  const handleProductTypeClick = useCallback(
    (categoryId: string, category_name: string) => {
      console.log(category_name);

      const splitedCategoyName = getCategoryName(category_name);
      push(`/${splitedCategoyName}`);
    },
    [push]
  );

  return (
    <div
      className="flex w-full justify-around items-center overflow-x-auto"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      {categories.map((item: ICategory) => (
        <>
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-4 "
            onClick={() => handleProductTypeClick(item.id, item.name)}
          >
            <img src={item.logo_url} height={200} width={200} />
            <Typography
              style={{
                fontSize: "1rem",
                textAlign: "center",
                fontFamily: "italic",
              }}
            >
              {item.category_name[language]}
            </Typography>
          </div>
        </>
      ))}
    </div>
  );
};

export default ProductTypeCards;
