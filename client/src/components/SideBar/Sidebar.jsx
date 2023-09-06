import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../utils/helpers";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.category);
  return (
    <div className="flex flex-col border ">
      {categories?.map((item, index) => (
        <NavLink
          key={index}
          to={createSlug(item.title)}
          className="px-2 my-6 pt-[10px] pb-[17px] hover:text-main"
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
