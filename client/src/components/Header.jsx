import React from "react";
import logo from "../assets/image/logo.png";
import { BsFillTelephoneFill, BsFillCartCheckFill } from "react-icons/bs";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "../utils/path";

const Header = () => {
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
        <div className="flex items-center gap-2 px-6 border-r">
          <BsFillCartCheckFill color="red" />
          <span>0 items(s)</span>
        </div>
        <div className="flex items-center px-6 ">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
