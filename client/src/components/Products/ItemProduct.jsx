import React, { memo, useState } from "react";
import label_red from "../../assets/image/label_red.png";
import label_yellow from "../../assets/image/label_yellow.png";
import { renderStarFromNumber, formatMoney } from "../../utils/helpers";
import SelectOption from "../Search/SelectOption";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateCart } from "../../apis";
import Swal from "sweetalert2";
import { getCurrent } from "../../redux/user/asyncAction";
import { toast } from "react-toastify";

const ItemProduct = ({ productData, isNew, normal }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "WISHLIST") {
      console.log("WISHLIST");
    }
    if (flag === "ADD-CART") {
      if (!current) {
        return Swal.fire({
          icon: "error",
          text: "Please log in to add products to cart!",
          cancelButtonText: "Cancel",
          confirmButtonText: "Go login",
          title: "Oops...!",
          showCancelButton: true,
        }).then((rs) => {
          if (rs.isConfirmed) {
            navigate(`/${path.LOGIN}`);
          }
        });
      }
      const response = await apiUpdateCart({ pid: productData._id });
      if (response) {
        toast.success("Add product to cart success!");
        dispatch(getCurrent());
      } else {
        toast.error("Add product to cart fail");
      }
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
        className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
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
                title="Quick view"
                onClick={(e) => {
                  handleClickOptions(e, "WISHLIST");
                }}
              >
                <SelectOption icon={<AiFillHeart />} />
              </span>
              {current?.cart?.some(
                (el) => el.product._id === productData._id
              ) ? (
                <span title="Added to cart">
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span
                  title="Add to cart"
                  onClick={(e) => {
                    handleClickOptions(e, "ADD-CART");
                  }}
                >
                  <SelectOption icon={<BsFillCartPlusFill />} />
                </span>
              )}
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
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemProduct);
