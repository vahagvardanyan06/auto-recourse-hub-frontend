import React, { useCallback } from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import Logo from "@/public/svg/logo/logo.png";
import Image from "next/image";
import SelectLanguage from "@/components/SelectLanguage";
import { useRouter } from "next/router";
import NavSearch from "../NavSearch";

const Header = () => {
  const { push } = useRouter();
  const handleLogoClick = useCallback(() => {
    push("/");
  }, [push]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(250 204 21)" }}>
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between gap-5">
          <Image
            src={Logo.src}
            alt="logo"
            height={80}
            width={80}
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
          <NavSearch />
          <SelectLanguage />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
