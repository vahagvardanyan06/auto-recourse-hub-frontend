"use client";
import tokenKey from "@/constants/token";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import { adminPages } from "@/constants/admin";
import CurrentAdminPage from "@/components/CurrentAdminPage";
import Notification from "@/components/Notification";

const Admin = () => {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setIsActivePage] = useState(adminPages.CREATE_CATEGORY);

  useEffect(() => {
    const token = sessionStorage.getItem(tokenKey);
    if (!token) {
      push("/p/login");
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    isOpen && (
      <div className="h-full w-full flex items-center justify-center flex-col">
        <AdminHeader
          activePage={activePage}
          setIsActivePage={setIsActivePage}
        />
        <CurrentAdminPage activePage={activePage} />
        <Notification />
      </div>
    )
  );
};

export default Admin;
