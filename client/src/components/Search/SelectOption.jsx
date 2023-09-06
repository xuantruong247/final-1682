import React, { memo } from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex justify-center items-center hover:bg-gray-800 hover:text-white  cursor-pointer">
      {icon}
    </div>
  );
};

export default memo(SelectOption);
