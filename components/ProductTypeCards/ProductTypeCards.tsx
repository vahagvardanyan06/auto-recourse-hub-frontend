import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import IProductTypeCards from "./types";
import { ICategory } from "@/types/types";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import { useRouter } from "next/router";
import getSplitedName from "@/utils/getSplitedName";

const ProductTypeCards = ({ categories }: IProductTypeCards) => {
  const isMobile = useIsMobile();
  const language = useSelector(selectLanguage);
  const { push } = useRouter();

  const handleProductTypeClick = useCallback(
    (category_name: string) => {
      const splitedCategoyName = getSplitedName(category_name);
      push(`/${splitedCategoyName}`);
    },
    [push]
  );

  return (
    <div className="flex w-full overflow-scroll gap-5">
      {categories.map((item: ICategory) => (
        <>
          <div
            className="flex flex-col items-center justify-center gap-4 cursor-pointer"
            onClick={() => handleProductTypeClick(item.name)}
            style={{ height: 200, width: 200 }}
          >
            <img
              src={item.logo_url.url}
              height={isMobile ? 100 : 200}
              width={isMobile ? 100 : 200}
              style={{ maxHeight: 200 }}
              className="object-contain rounded-full"
            />
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
