import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import notSearchResult_texts from "@/messages/notSearchResult";

const NotSearchResult = () => {
  const language = useSelector(selectLanguage);
  return (
    <div className="m-10 p-10 rounded-2xl bg-slate-50">
      <div className="flex flex-col gap-5">
        <Typography>{notSearchResult_texts.title[language]}</Typography>
        <div className="flex flex-col gap-2">
          {notSearchResult_texts.reasons[language].map((reason) => (
            <li>{reason}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotSearchResult;
