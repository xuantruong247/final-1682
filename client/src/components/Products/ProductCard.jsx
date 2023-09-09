import React, { memo } from "react";
import { renderStarFromNumber, formatMoney } from "../../utils/helpers";
import { NavLink } from "react-router-dom";
import path from "../../utils/path";

const ProductCard = ({ avatar, title, price, totalRatings,productData }) => {
  return (
    <NavLink
    to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
    className="w-1/3 flex-auto p-[10px]">
      <div className="flex border">
        <img src={avatar} alt="Products" className="w-[150px] p-4" />

        <div className="flex flex-col justify-center items-start gap-1 w-full text-sm cursor-pointer">
          <span className="line-clamp-1 hover:text-main text-sm">{title}</span>
          <span className="flex ">
            {renderStarFromNumber(totalRatings)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default memo(ProductCard);
