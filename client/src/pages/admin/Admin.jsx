import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "../../components";

const Admin = () => {
  const { isLogindIn, current } = useSelector((state) => state.user);
  if (!isLogindIn || !current || !current.role === "admin") {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex">
      <div className="w-[300px] border flex-none">
        <AdminSidebar />
      </div>
      <div className="flex-auto min-h-screen bg-sky-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
