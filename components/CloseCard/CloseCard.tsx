import React from "react";
import ICloseCard from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const CloseCard = ({ url, closeCallback, alt = "", key }: ICloseCard) => {
  return (
    <div
      className="flex bg-slate-600 p-5 relative gap-2 flex-col w-max"
      key={key}
    >
      {closeCallback && (
        <div className="bg-blue-400 rounded-full w-16">
          <Button onClick={closeCallback} className=" flex justify-end">
            <CloseIcon />
          </Button>
        </div>
      )}
      <img
        src={url}
        alt={alt}
        className="max-w-full max-h-96"
        width={200}
        height={200}
      />
    </div>
  );
};

export default CloseCard;
