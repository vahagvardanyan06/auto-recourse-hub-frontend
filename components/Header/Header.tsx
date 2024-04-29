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
    // TODOD :: Change AppBar's background color
    // TODOD :: Change X overflowing
    <AppBar className="bg-yellow-400" position="fixed">
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
