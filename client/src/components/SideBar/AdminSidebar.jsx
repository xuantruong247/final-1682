import React, { memo, Fragment, useState } from "react";
import logoAdmin from "../../assets/image/logo.png";
import { adminSidebar } from "../../utils/contants";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import path from "../../utils/path";

const activeStype =
  "px-4 py-2 flex items-center gap-2 text-white bg-main font-medium border  rounded-lg";
const notActiveStype =
  "px-4 py-2 flex items-center gap-2 hover:bg-extra hover:text-white rounded-lg";

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState([]);

  const handleShowTab = (tabID) => {
    if (activeTab.some((el) => el === tabID)) {
      setActiveTab((prev) => prev.filter((el) => el !== tabID));
    } else {
      setActiveTab((prev) => [...prev, tabID]);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col justify-between">
      <div className="py-4">
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <NavLink to={`/${path.HOME}`}>
            <img
              src={logoAdmin}
              alt="logo"
              className="w-[230px] object-contain "
            />
          </NavLink>
          <span className="font-medium">Admin workspace</span>
        </div>
        <div>
          {adminSidebar.map((item, index) => (
            <Fragment key={index}>
              {item.type === "SINGLE" && (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(isActive && activeStype, !isActive && notActiveStype)
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              )}
              {item.type === "PARENT" && (
                <div
                  className="flex flex-col"
                  onClick={() => {
                    handleShowTab(item.id);
                  }}
                >
                  <div className="flex items-center justify-between py-2 px-4 hover:bg-extra hover:text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                    {!activeTab.some((id) => id === item.id) ? (
                      <AiFillCaretRight />
                    ) : (
                      <AiFillCaretDown />
                    )}
                  </div>
                  {activeTab.some((id) => id === item.id) && (
                    <div className="flex flex-col pl-6 text-[15px]">
                      {item.subMenu.map((el) => (
                        <NavLink
                          key={el.text}
                          to={el.path}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={({ isActive }) =>
                            clsx(isActive ? activeStype : notActiveStype)
                          }
                        >
                          {el.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
