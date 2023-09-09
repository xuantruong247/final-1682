import React from "react";
import { useSelector } from "react-redux";
import { Button, OrderItem } from "../../components";
import { formatMoney } from "../../utils/helpers";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

const DetailCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="h-[81px] flex  items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium uppercase">Your Cart</h3>
        </div>
      </div>
      <div className="grid grid-cols-10 w-main mx-auto border p-3 text-center mt-8 text-xl font-semibold">
        <span className="col-span-6 w-full"></span>
        <span className="col-span-1 w-full">QUANTITY</span>
        <span className="col-span-3 w-full text-end">TOTAL</span>
      </div>
      {currentCart?.map((item, index) => (
        <OrderItem item={item} key={index} defaultQuantity={item.quantity} />
      ))}
      <div className="w-main mx-auto flex flex-col justify-center items-end gap-3 border p-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal: </span>
          <span className="font-bold text-main text-base">
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => +el.product.price * el.quantity + sum,
                0
              )
            ) + " VND"}
          </span>
        </span>
        <span className="text-xs italic">
          Shipping, taxes, and discounts calculated at checkout
        </span>
        <div className="flex justify-between gap-3">
          <Button
            style=" 
            px-4
            py-2
            rounded-md
            text-white
            bg-black
            text-semibold
            w-full hover:bg-main
            "
            handlerOnclick={() => {
              navigate(`/${path.PRODUCTS}`);
            }}
          >
            Continue Shopping
          </Button>
          <Button
            style=" 
            px-4
            py-2
            rounded-md
            text-white
            bg-main
            text-semibold
            w-full hover:bg-black
            flex items-center gap-2
            "
          >
            <span>Checkout</span>
            <BsArrowRightShort />
          </Button>
        </div>
      </div>
      <div className="my-8 w-main mx-auto bg-black text-white rounded-md py-1">
        <span className="text-sm flex justify-center items-center">
          All orders are processed in USD. While the content of your cart is
          currently displayed in VND, you will checkout using USD at the most
          current exchange rate.
        </span>
      </div>
    </div>
  );
};

export default DetailCart;
