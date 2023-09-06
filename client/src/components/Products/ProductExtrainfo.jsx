import React, { memo } from "react";

const ProductExtrainfo = ({ icon, title, sub }) => {
  return (
    <div className="flex p-4 gap-4 items-center mb-[10px] border">
      <span className="p-2 bg-gray-800 rounded-full flex items-center text-white justify-center ">{icon}</span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtrainfo);
