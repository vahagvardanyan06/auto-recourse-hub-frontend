import { Divider, Typography } from "@mui/material";
import IContactContainer from "./types";
import contact_texts from "@/messages/contact";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import React from "react";

const ContactContainer = ({
  contactInfo: { fullname, phoneNumber, email },
}: IContactContainer) => {
  const language = useSelector(selectLanguage);
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Divider />

      <Typography>{contact_texts.contact[language]}</Typography>
      <div className="flex gap-2">
        <Typography>{contact_texts.tel[language]}</Typography>
        <Typography className="cursor-pointer text-blue-400">
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </Typography>
      </div>
      <div className="flex gap-2">
        <Typography>{contact_texts.email[language]}</Typography>
        <Typography>{email}</Typography>
      </div>
      <div>
        <Typography>{fullname}</Typography>
      </div>
    </div>
  );
};

export default ContactContainer;
