import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Tab, Tabs } from "@mui/material";
import IAdminHeader from "./types";
import { useCallback } from "react";
import { adminPages } from "@/constants/admin";

function AdminHeader({ activePage, setIsActivePage }: IAdminHeader) {
  const handleTabChange = useCallback((value: string) => {
    setIsActivePage(value);
  }, []);

  return (
    <AppBar position="static">
      <Tabs
        value={activePage}
        onChange={(_, value) => handleTabChange(value)}
        textColor="inherit"
      >
        <div className="overflow-scroll">
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
        </div>
      </Tabs>
    </AppBar>
  );
}
export default AdminHeader;
