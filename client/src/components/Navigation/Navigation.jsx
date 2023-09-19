import React, { memo } from "react";
import { navigation } from "../../utils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="border-y w-main h-[48px] py-2 text-sm flex items-center msm:min-w-[640px] msm:justify-center mlg:min-w-[1023px] mlg:justify-center mxl:min-w-[1279px] mxl:justify-center">
      {navigation.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "pr-12 font-bold hover:text-main text-main"
              : "pr-12 hover:text-main"
          }
        >
          {item.value}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Navigation);
