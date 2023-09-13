import React, { useState } from "react";
import { Breakcrumb } from "../../components";
import { AiOutlineRight, AiOutlineMinus } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";

const activeStyle = "bg-main text-white";
const notActiveStyle = "";

const FAQ = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium">FAQs</h3>
          <span className="flex gap-1">
            <Breakcrumb />
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              FAQs
            </span>
          </span>
        </div>
      </div>
      <div className="w-main m-auto p-4">
       
      </div>
      
    </div>
  );
};

export default FAQ;
