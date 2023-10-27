import React, { useEffect, useState } from "react";
import imgPayment from "../../assets/image/payment.svg";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../utils/helpers";
import Paypal from "../../components/Common/Paypal";
import { Congrat } from "../../components";
import { getCurrent } from "../../redux/user/asyncAction";

const Checkout = () => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrent());
    }
  }, [isSuccess]);
  return (
    <div className="w-full p-8 grid grid-cols-10 gap-6 h-full max-h-screen overflow-y-auto">
      {isSuccess && <Congrat />}
      <div className="w-full flex items-center justify-center col-span-4">
        <img
          src={imgPayment}
          alt="imgPayment"
          className="object-contain"
        />
      </div>

      <div className="w-full flex flex-col col-span-6 gap-6 items-center justify-center">
        <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full border bg-gray-200 ">
              <th className="text-left p-2">Products</th>
              <th className="text-center p-2">Quantity</th>
              <th className="text-end p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((item, index) => (
              <tr key={index} className="border">
                <td className="p-2">{item.product.title}</td>
                <td className="text-center p-2">{item.quantity}</td>
                <td className="text-end p-2">
                  {formatMoney(item.product.price) + "VND"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="flex items-center justify-end gap-8 text-sm">
          <span>Subtotal: </span>
          <span className="font-bold text-main text-base">
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => +el.product.price * el.quantity + sum,
                0
              ) / 23500
            ) + " $"}
          </span>
        </span>
        <span className="flex items-center justify-end gap-3 text-sm">
          <span>Address: </span>
          <span className="font-bold text-main text-base">
            {current?.address}
          </span>
        </span>
        <div className="w-full">
          <Paypal
            setIsSuccess={setIsSuccess}
            payload={{
              products: currentCart,
              total: (
                +currentCart?.reduce(
                  (sum, el) => +el.product.price * el.quantity + sum,
                  0
                ) / 23500
              ).toFixed(2),
              address: current?.address,
            }}
            amount={(
              +currentCart?.reduce(
                (sum, el) => +el.product.price * el.quantity + sum,
                0
              ) / 23500
            ).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
