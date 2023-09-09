import React, { useCallback, useEffect, useState } from "react";
import SelectQuantity from "../Common/SelectQuantity";
import { apiRemoveCart } from "../../apis";
import Swal from "sweetalert2";
import { getCurrent } from "../../redux/user/asyncAction";
import { useDispatch } from "react-redux";
import { formatMoney } from "../../utils/helpers";
import { updateCart } from "../../redux/user/userSlice";

const OrderItem = ({ item, defaultQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const dispatch = useDispatch();
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 0) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  useEffect(() => {
    dispatch(updateCart({ pid: item.product._id, quantity }));
  }, [quantity]);

  const removeCart = async (pid) => {
    const response = await apiRemoveCart(pid);
    if (response) {
      dispatch(getCurrent());
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Product deletion failed!",
      });
    }
  };

  return (
    <div className="grid grid-cols-10 w-main mx-auto border p-3 text-center ">
      <span className="col-span-6 w-full flex items-center">
        <img
          src={item.product.avatar}
          alt="avatar"
          className="w-44 h-w-44 object-cover"
        />
        <div className="flex flex-col gap-2 text-start ml-5">
          <span className="text-sm hover:text-main cursor-pointer">
            {item.product.title}
          </span>
          <span
            onClick={() => {
              removeCart(item.product._id);
            }}
            className="text-sm hover:text-main cursor-pointer"
          >
            Remove
          </span>
        </div>
      </span>
      <span className="col-span-1 w-full flex items-center">
        <SelectQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          handleChangeQuantity={handleChangeQuantity}
        />
      </span>
      <span className="col-span-3 w-full font-semibold flex items-center justify-end">
        {formatMoney(item.product.price * quantity) + " VND"}
      </span>
    </div>
  );
};

export default OrderItem;
