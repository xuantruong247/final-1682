import React from "react";
import { formatMoney } from "../../utils/helpers";
import Button from "../Buttons/Button";
import { useDispatch } from "react-redux";
import { apiUpdateCart, apiUpdateWishlist } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../redux/user/asyncAction";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

const ItemWishlist = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteWishlist = async () => {
    const response = await apiUpdateWishlist({ pid: productData._id });
    if (response) {
      toast.success("Delete product success.");
      dispatch(getCurrent());
    }
  };

  const addToCart = async () => {
    const response = await apiUpdateCart({ pid: productData._id });
    if (response) {
      toast.success("Add to cart success.");
      dispatch(getCurrent());
    }
  };

  return (
    <div className="bg-white p-2 cursor-pointer">
      <div
        onClick={() => {
          navigate(
            `/${path.DETAIL_PRODUCT}/${productData._id}/${productData?.title}`
          );
        }}
      >
        <img
          src={productData.avatar}
          alt=""
          className="w-[274px] h-[250px] object-cover m-auto"
        />
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full pb-4">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          style={
            "px-4 py-2 rounded-md text-white bg-main hover:bg-black text-semibold w-full"
          }
          handlerOnclick={() => {
            addToCart(productData._id);
          }}
        >
          Add To Cart
        </Button>
        <Button
          style={
            "px-4 py-2 rounded-md text-white bg-black hover:bg-main text-semibold w-full"
          }
          handlerOnclick={() => {
            deleteWishlist(productData._id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ItemWishlist;
