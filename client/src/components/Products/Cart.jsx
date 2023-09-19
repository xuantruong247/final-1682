import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../redux/category/categorySlide";
import { formatMoney } from "../../utils/helpers";
import { Button } from "../../components";
import { BsTrash } from "react-icons/bs";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../redux/user/asyncAction";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";

const Cart = () => {
  const { currentCart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-[450px] h-screen bg-black text-white p-6 grid grid-rows-10"
    >
      <header className="border-b border-gray-500 font-bold text-xl flex justify-between items-center row-span-1 h-full">
        <span>Your Cart</span>
        <span
          onClick={() => {
            dispatch(showCart());
          }}
          className="cursor-pointer p-2"
        >
          <AiOutlineCloseCircle size={30} />
        </span>
      </header>
      <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Your cart is empty</span>
        )}
        {currentCart &&
          currentCart?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex gap-2">
                <img
                  src={item.product.avatar}
                  alt="avatar"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col justify-between my-1">
                  <span className="text-sm">{item.product.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span className="text-base">
                    {formatMoney(item.product.price * item.quantity) + " VND"}
                  </span>
                </div>
              </div>
              <span
                onClick={() => {
                  removeCart(item.product._id);
                }}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-500 cursor-pointer"
              >
                <BsTrash size={16} />
              </span>
            </div>
          ))}
      </section>
      <div className="row-span-2 h-full flex flex-col justify-between ">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Subtotal:</span>
          <span className="text-base">
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => +el.product.price * el.quantity + sum,
                0
              )
            ) + " VND"}
          </span>
        </div>
        <span className="flex justify-center text-gray-500 italic text-sm">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <div className="flex flex-col gap-2">
          <Button
            handlerOnclick={() => {
              navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
              dispatch(showCart());
            }}
            style="rounded-none w-full bg-main py-2 flex items-center justify-center"
          >
            <span>Shopping Cart</span>
            <BsArrowRightShort />
          </Button>
          <Link
            target="_blank"
            to={`/${path.CHECKOUT}`}
            className=" 
            rounded-none w-full bg-main py-2 flex items-center justify-center
            "
          >
            <span>Checkout</span>
            <BsArrowRightShort />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
