import React, { useState, useEffect, memo } from "react";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { apiGetAllProducts } from "../../apis/product";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
import Countdown from "../Common/Countdown";

const DealDaily = () => {
  let idInterval;
  const [dealdaily, setDealdaily] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const getDealdaily = async () => {
    const response = await apiGetAllProducts({
      
      // page: 5,
      // random images
      page: Math.round() * 2,
      totalRatings: 5,
    });
    if (response.data.products) {
      setDealdaily(response?.data?.products);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
      console.log(response.data.products);
    }
  };
  
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    getDealdaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4">
        <span className="flex-1 flex justify-center">
          <AiFillStar color="#dd1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center  gap-2">
        <img
          src={dealdaily[0]?.avatar}
          alt="Product"
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealdaily?.title}</span>
        <span className="flex h-4 text-xl">
          {renderStarFromNumber(dealdaily[0]?.totalRatings)?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </span>
        <span>{`${formatMoney(dealdaily[0]?.price)} Vnd`}</span>
      </div>
      <div className="px-4 mt-10">
        <div className="flex gap-2 items-center justify-center mb-5">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
          type="button"
        >
          <AiOutlineMenu />
          <span>Option</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
