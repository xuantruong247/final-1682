import React, { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[70px] border flex flex-col items-center justify-center bg-gray-100 rounded-md">
      <span className="text-[-18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(Countdown);
