import React, { memo, useState } from "react";
import label_red from "../../assets/image/label_red.png";
import label_yellow from "../../assets/image/label_yellow.png";
import { renderStarFromNumber, formatMoney } from "../../utils/helpers";
import SelectOption from "../Search/SelectOption";
import { AiOutlineEye, AiFillHeart, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";

const ItemProduct = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const navigate = useNavigate();

  const handleClickOptions = (e, flag) => {
    e.stopPropagation();
    if (flag === "QUICK_VIEW") {
      console.log("QUICK_VIEW");
    }
    if (flag === "MENU") {
      navigate(
        `/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`
      );
    }
    if (flag === "WISHLIST") {
      console.log("WISHLIST");
    }
  };

  return (
    <div className="w-full px-[8px]">
      <div
        onClick={() => {
          navigate(
            `/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`
          );
        }}
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 gap-2 flex justify-center animate-slide-top">
              <span
                onClick={(e) => {
                  handleClickOptions(e, "QUICK_VIEW");
                }}
              >
                <SelectOption icon={<AiFillHeart />} />
              </span>
              <span
                onClick={(e) => {
                  handleClickOptions(e, "MENU");
                }}
              >
                <SelectOption icon={<AiOutlineMenu />} />
              </span>
              <span
                onClick={(e) => {
                  handleClickOptions(e, "WISHLIST");
                }}
              >
                <SelectOption icon={<AiOutlineEye />} />
              </span>
            </div>
          )}
          <img
            src={productData?.avatar || " "}
            alt="product"
            className="w-[274px] h-[274px] object-cover m-auto"
          />
          {!normal && (
            <img
              src={isNew ? label_red : label_yellow}
              alt=""
              className="absolute top-[-17px] left-[180px] w-[100px] h-[35px] object-cover"
            />
          )}
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (item, index) => (
                <span key={index}>{item}</span>
              )
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemProduct);
