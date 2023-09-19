import React, { useState } from "react";
import { Breakcrumb } from "../../components";
import { AiOutlineRight, AiOutlineMinus } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { mapFAQs } from "../../utils/contants";

const activeStyle = "bg-main text-white";
const notActiveStyle = "";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleActive = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
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
              <span>FAQs</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-main m-auto mt-4 mb-16 flex flex-col gap-2">
        {mapFAQs.map((item, index) => (
          <div key={index}>
            <div
              className={`border flex items-center justify-between p-4 cursor-pointer ${
                activeIndex === index ? activeStyle : notActiveStyle
              }`}
              onClick={() => toggleActive(index)}
            >
              <span>{item.title}</span>
              {activeIndex === index ? (
                <AiOutlineMinus />
              ) : (
                <GrFormAdd size={18} />
              )}
            </div>
            {activeIndex === index && (
              <span className="block border w-full p-4">{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
