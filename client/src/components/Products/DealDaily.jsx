import React, { useState, useEffect, memo } from "react";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { apiGetAllProducts } from "../../apis/product";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
import Countdown from "../Common/Countdown";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

const DealDaily = () => {
  let idInterval;
  const [dealdaily, setDealdaily] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const navigate = useNavigate();
  const getDealdaily = async () => {
    const response = await apiGetAllProducts({
      sort: "totalRatings",
    });
    if (response.data.products) {
      setDealdaily(response?.data?.products);
      const h = 23 - new Date().getHours();
      const m = 59 - new Date().getMinutes();
      const s = 59 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
    }
  };

  useEffect(() => {
    getDealdaily();
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
            if (currentProductIndex < dealdaily.length - 1) {
              setCurrentProductIndex((prevIndex) => prevIndex + 1);
              getDealdaily(); // Lấy thông tin sản phẩm mới
            } else {
              setExpireTime(true); // Đánh dấu là hết thời gian cho sản phẩm cuối cùng
              clearInterval(idInterval); // Dừng hẹn giờ
            }
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="border w-full pb-10 flex-auto">
      <div className="flex items-center justify-between p-4">
        <span className="flex-1 flex justify-center">
          <AiFillStar color="#dd1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        {dealdaily.length > 0 && (
          <>
            <img
              src={dealdaily[0]?.avatar}
              alt="Product"
              className="w-full object-contain rounded-md p-2"
            />
            <span className="line-clamp-1 text-center">
              {dealdaily[0]?.title}
            </span>
            <span>{`${formatMoney(dealdaily[0]?.price)} VND`}</span>
            <span className="flex h-4 text-xl">
              {renderStarFromNumber(dealdaily[0]?.totalRatings)?.map(
                (item, index) => (
                  <span key={index}>{item}</span>
                )
              )}
            </span>
          </>
        )}
      </div>

      <div className="px-4 mt-12">
        <div className="flex gap-2 items-center justify-center mb-10">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          onClick={() => {
            navigate(`/${path.PRODUCTS}`);
          }}
          className="flex gap-4 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
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
