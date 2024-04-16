"use client";
import tokenKey from "@/constants/token";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateCategory from "@/components/CreateCategory";
import DeleteCategory from "@/components/DeleteCategory";
import AdminHeader from "@/components/AdminHeader";
import { adminPages } from "@/constants/admin";
import CreateProduct from "@/components/CreateProduct";
import DeleteProduct from "@/components/DeleteProduct";
import CurrentAdminPage from "@/components/CurrentAdminPage";

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
      </div>
    )
  );
};

export default Admin;
