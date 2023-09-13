import React, { memo } from "react";
import demo from "../../assets/image/voucher_1.png";
import demo1 from "../../assets/image/voucher_2.png";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-[300px] gap-2">
      <img src={demo} alt="" className="h-[150px]" />
      <img src={demo1} alt="" className="h-[150px]" />
    </div>
  );
};

export default memo(Sidebar);
