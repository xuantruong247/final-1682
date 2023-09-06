import React, { memo } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full">
      <div className="h-[103px] bg-main flex flex-col items-center justify-center">
        <div className="w-main flex justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex ">
            <input
              type="text"
              placeholder="Email address"
              className="p-2 rounded-l-full w-full bg-[#f04646] outline-none text-gray-300 placeholder:text-sm placeholder:italic placeholder:opacity-50"
            />
            <div className="h-[56px] w-[56px] bg-[#f04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[400px] bg-gray-800 flex flex-col items-center justify-center text-white text-[13px]">
        <div className="w-main flex h-[350px] py-[80px]">
          <div className="flex-5 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              ABOUT US
            </h3>
            <span className="flex gap-2">
              <span className="flex gap-2">
                <ImLocation2 size={15} /> Address:
              </span>
              <span className="opacity-50">
                15/1b Hong Ha, Ward 2, Tan Binh District, Ho Chi Minh City
              </span>
            </span>
            <span className="flex gap-2">
              <span className="flex gap-2">
                <MdPhone /> Phone:
              </span>
              <span className="opacity-50">(0856) 93 2222</span>
            </span>
            <span className="flex gap-2">
              <span className="flex gap-2">
                <MdEmail />
                Mail:
              </span>
              <span className="opacity-50">truongnxgcs190087@fpt.edu.vn</span>
            </span>
          </div>
          <div className="flex-2">
            <div className="flex flex-col gap-2">
              <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                INFORMATION
              </h3>
              <span className="hover:text-gray-500 cursor-pointer">
                Typogramphy
              </span>
              <span className="hover:text-gray-500 cursor-pointer">
                Gallery
              </span>
              <span className="hover:text-gray-500 cursor-pointer">
                Store Location
              </span>
              <span className="hover:text-gray-500 cursor-pointer">
                Today's Deals
              </span>
              <span className="hover:text-gray-500 cursor-pointer">
                Contact
              </span>
            </div>
          </div>
          <div className="flex-2">
            <div className="flex flex-col gap-2">
              <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
                INFORMATION
              </h3>
              <span className="hover:text-gray-500 cursor-pointer">Help</span>
              <span className="hover:text-gray-500 cursor-pointer">
                Free Shipping
              </span>
              <span className="hover:text-gray-500 cursor-pointer">FAQs</span>
              <span className="hover:text-gray-500 cursor-pointer">
                Return & Exchange
              </span>
              <span className="hover:text-gray-500 cursor-pointer">
                Testimonials
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              #PERFUMESINCE2001STORE
            </h3>
          </div>
        </div>
        <span className="border-b border-main w-main "></span>
        <div className="text-[15px] text-gray-300 pt-[10px] ">
          Copyright {year} developed by Xuan Truong. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
