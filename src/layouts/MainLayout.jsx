import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/sidebar";
import EditorSidebar from "../components/layout/EditorSidebar";

const MainLayout = () => {
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("role"))?.role
  );
  return (
    <>
      <Header />
      {role === "superAdmin" ? <Sidebar /> : <EditorSidebar />}
      <div className="pt-16 lg:pl-56 w-full">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
