import React, { memo, useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";

const VoteBar = ({ number, ratingsCount, ratingTotal }) => {
  const percentRef = useRef();

  const percent = Math.round((ratingsCount * 100) / ratingTotal) || 0;

  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingsCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-gray-500">
      <div className="flex w-[10%] items-center justify-center gap-1 text-sm ">
        <span>{number}</span>
        <AiFillStar className="text-orange-400 " />
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[6px] bg-gray-200 rounded-sm relative">
          <div
            ref={percentRef}
            className="absolute inset-0 bg-red-500 right-2"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end text-sm">{`${
        ratingsCount || 0
      } reviewrs`}</div>
    </div>
  );
};

export default memo(VoteBar);
