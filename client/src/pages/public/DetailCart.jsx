import React from "react";
import { useSelector } from "react-redux";
import { Button, OrderItem } from "../../components";
import { formatMoney } from "../../utils/helpers";
import { BsArrowRightShort } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";

const DetailCart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>My cart</span>
      </h1>
      <div className="bg-white w-main mx-auto">
        <div className="grid grid-cols-10 w-main mx-auto border p-3 text-center mt-8 text-xl font-semibold">
          <span className="col-span-6 w-full">PRODUCT</span>
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
            <Link
              target="_blank"
              to={`/${path.CHECKOUT}`}
              className=" 
            px-4
            py-2
            rounded-md
            text-white
            bg-main
            text-semibold
           hover:bg-black
            flex items-center gap-2
            "
            >
              <span>Checkout</span>
              <BsArrowRightShort />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
