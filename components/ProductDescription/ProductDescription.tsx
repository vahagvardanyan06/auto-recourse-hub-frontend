import { Divider, Typography } from "@mui/material";
import IProductDescription from "./types";
import product_description_texts from "@/messages/productDesciption";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";

const ProductDescription = ({ description }: IProductDescription) => {
  const language = useSelector(selectLanguage);

  description = `

  A crane from the manufacturer Wolf type WK92 SL is being sold. The crane has a hook height of 20m and a radius of 40m. The maximum load of the crane is 6.00t. At the top the crane carries 2.10t. The WK92 SL is equipped with a radio remote control and cabin control. The crane is dismantled in 35305 Grünberg and can be viewed. There is no foundation anchor or cross included with the crane. Please report any further questions.
  A crane from the manufacturer Wolf type WK92 SL is being sold. The crane has a hook height of 20m and a radius of 40m. The maximum load of the crane is 6.00t. At the top the crane carries 2.10t. The WK92 SL is equipped with a radio remote control and cabin control. The crane is dismantled in 35305 Grünberg and can be viewed. There is no foundation anchor or cross included with the crane. Please report any further questions.A crane from the manufacturer Wolf type WK92 SL is being sold. The crane has a hook height of 20m and a radius of 40m. The maximum load of the crane is 6.00t. At the top the crane carries 2.10t. The WK92 SL is equipped with a radio remote control and cabin control. The crane is dismantled in 35305 Grünberg and can be viewed. There is no foundation anchor or cross included with the crane. Please report any further questions.A crane from the manufacturer Wolf type WK92 SL is being sold. The crane has a hook height of 20m and a radius of 40m. The maximum load of the crane is 6.00t. At the top the crane carries 2.10t. The WK92 SL is equipped with a radio remote control and cabin control. The crane is dismantled in 35305 Grünberg and can be viewed. There is no foundation anchor or cross included with the crane. Please report any further questions.
  `;

  return (
    <div className="flex flex-col gap-4">
      <Typography>{product_description_texts.description[language]}</Typography>
      <Divider />
      <Typography>{description}</Typography>
    </div>
  );
};

export default ProductDescription;
