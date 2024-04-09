import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Tab, Tabs } from "@mui/material";
import IAdminHeader from "./types";
import { useCallback } from "react";
import { adminPages } from "@/constants/admin";

function AdminHeader({ activePage, setIsActivePage }: IAdminHeader) {
  const handleTabChange = useCallback((value: string) => {
    console.log(value);

    setIsActivePage(value);
  }, []);

  return (
    <AppBar position="static">
      <Tabs
        value={activePage}
        onChange={(_, value) => handleTabChange(value)}
        textColor="inherit"
      >
        <Tab
          value={adminPages.CREATE_CATEGORY}
          label={adminPages.CREATE_CATEGORY}
        />
        <Tab
          value={adminPages.DELETE_CATEGORY}
          label={adminPages.DELETE_CATEGORY}
        />
        <Tab
          value={adminPages.CREATE_PRODUCT}
          label={adminPages.CREATE_PRODUCT}
        />
        <Tab
          value={adminPages.DELETE_PRODUCT}
          label={adminPages.DELETE_PRODUCT}
        />
        <Tab
          value={adminPages.UPDATE_CATEGORY}
          label={adminPages.UPDATE_CATEGORY}
        />
        <Tab
          value={adminPages.UPDATE_PRODUCT}
          label={adminPages.UPDATE_PRODUCT}
        />
      </Tabs>
    </AppBar>
  );
}
export default AdminHeader;
