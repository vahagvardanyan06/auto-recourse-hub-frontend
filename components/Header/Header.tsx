import React, { useCallback } from "react";
import { AppBar, Container, Toolbar, useTheme } from "@mui/material";
import Logo from "@/public/svg/logo/tow-truck-svgrepo-com.svg";
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
    <AppBar className="bg-yellow-400" position="fixed">
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between gap-5">
          <Image
            src={Logo.src}
            alt="logo"
            height={60}
            width={50}
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
