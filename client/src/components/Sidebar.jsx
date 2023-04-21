import React, { useState, useEffect } from "react";
import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../utils/helpers";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    const response = await apiGetCategories();
    if (response?.data?.success) {
      setCategories(response?.data?.getProductsCategory);
    }
    console.log(response.data);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div className="flex flex-col border">
      {categories?.map((item, index) => (
        <NavLink
          key={index}
          to={createSlug(item.title)}
          className="px-2 py-6 pt-[17px] pb-[17px] hover:text-main"
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
