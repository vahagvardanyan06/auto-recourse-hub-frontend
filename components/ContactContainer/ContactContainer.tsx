import { Divider, Typography } from "@mui/material";
import IContactContainer from "./types";
import contact_texts from "@/messages/contact";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";

const ContactContainer = ({
  contactInfo: { fullname, phoneNumber },
}: IContactContainer) => {
  const language = useSelector(selectLanguage);
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Divider />

      <Typography>{contact_texts.contact[language]}</Typography>
      <div className="flex gap-1">
        <Typography>{contact_texts.tel[language]}</Typography>
        <Typography className="cursor-pointer text-blue-400">
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </Typography>
      </div>
      <div>
        <Typography>{fullname}</Typography>
      </div>
    </div>
  );
};

export default ContactContainer;
