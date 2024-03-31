import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/selectors";
import footerTexts from "@/messages/footer";

export default function Footer() {
  const language = useSelector(selectLanguage);

  const { aboutUs, contactUs, followUs } = footerTexts as any;

  return (
    <Container className="mt-5">
      <Divider />

      <Box
        component="footer"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default[200],
          p: 6,
          display: "flex",
          justifyContent: "space-around",
          gap: 10,
          "@media (max-width: 880px)": {
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
          },
        }}
      >
        <div className="max-w-md">
          <Typography variant="h6" color="text.primary" gutterBottom>
            {aboutUs.display_name[language]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {aboutUs.description[language]}
          </Typography>
        </div>

        <div>
          <Typography variant="h6" color="text.primary" gutterBottom>
            {contactUs.display_name[language]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {contactUs.contact.address[language]}
          </Typography>
          <div className="flex gap-2 ">
            <div>
              <Typography variant="body2" color="text.secondary">
                {contactUs.contact.phone[language].display_name}
              </Typography>
            </div>
            <div className="flex flex-col">
              <a href={`tel:${contactUs.contact.phone[language].phone1}`}>
                {contactUs.contact.phone[language].phone1}
              </a>
              <a href={`tel:${contactUs.contact.phone[language].phone2}`}>
                {contactUs.contact.phone[language].phone2}
              </a>
            </div>
          </div>
        </div>
      </Box>
      <div className="mb-2">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://your-website.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </Container>
  );
}
