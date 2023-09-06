import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";
import MemberSidebar from "../../components/SideBar/MemberSidebar";

const Menber = () => {
  const { isLogindIn, current } = useSelector((state) => state.user);
  if (!isLogindIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] border flex-none">
      <MemberSidebar />
      </div>
      <div className="flex-auto bg-sky-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Menber;
