import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { BsFillTelephoneFill, BsFillCartCheckFill } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import { showCart } from "../../redux/category/categorySlide";

const Header = () => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  useEffect(() => {
    const handleClickoutOption = (e) => {
      const profile = document.getElementById("profile");
      if (profile && !profile.contains(e.target)) {
        setIsShowOption(false);
      }
    };
    document.addEventListener("click", handleClickoutOption);

    return () => {
      document.removeEventListener("click", handleClickoutOption);
    };
  }, []);

  const dispatch = useDispatch();

  return (
    <div className=" w-main h-[110px] py-[35px] flex justify-between">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[250px] h-[45px]" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r">
          <p className="flex gap-4 items-center">
            <BsFillTelephoneFill color="red" />
            <span className="font-semibold">(0856) 93 2222 </span>
          </p>
          <span>Mon-Sat 9:00AM - 8:00 PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <p className="flex gap-4 items-center">
            <MdMarkEmailUnread color="red" />
            <span className="font-semibold">TRUONGNXGCS190087@FPT.EDU.VN </span>
          </p>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => {
                dispatch(showCart());
              }}
              className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer"
            >
              <BsFillCartCheckFill color="red" />
              <span>{`${current.cart.length || 0} item(s)`}</span>
            </div>
            <div
              className="flex items-center justify-center px-6 gap-2 cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsShowOption((prev) => !prev);
              }}
              id="profile"
            >
              <FaUserCircle color="red" />
              <span>Profile</span>
              {isShowOption && (
                <div className="absolute top-full  bg-gray-50 p-2 min-w-[150px] left-[13px] flex flex-col">
                  <Link
                    className=" hover:bg-main hover:text-white rounded-sm p-1 hover:font-semibold"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {current.role === "admin" && (
                    <Link
                      className=" hover:bg-main hover:text-white rounded-sm p-1 hover:font-semibold"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <Link
                    className=" hover:bg-main hover:text-white rounded-sm p-1 hover:font-semibold"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
