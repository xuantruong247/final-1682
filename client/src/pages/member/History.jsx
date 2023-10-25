import React, { Fragment, useEffect, useState } from "react";
import { apiGetHistoryBuyOrder } from "./../../apis/user";
import { formatMoney } from "../../utils/helpers";

const History = () => {
  const [getHistory, setGetHistory] = useState([]);

  const fetchApiGetHistory = async () => {
    const response = await apiGetHistoryBuyOrder();
    setGetHistory(response.data.purchaseHistory);
    console.log(response.data.purchaseHistory);
  };

  useEffect(() => {
    fetchApiGetHistory();
  }, []);
  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Purchase history</span>
      </h1>
      <div className="w-main mx-auto">
        <div className="px-2">
          <div className="bg-white grid grid-cols-10  border p-3 text-center mt-8 text-xl font-semibold">
            <span className="col-span-5 w-full">PRODUCT</span>
            <span className="col-span-1 w-full">STATUS</span>
            <span className="col-span-2 w-full ">TOTAL</span>
            <span className="col-span-2 w-full ">ACTION</span>
          </div>
          {getHistory.map((el) => (
            <Fragment key={el._id}>
              {el.order.products.map((item, index) => (
                <div className="grid grid-cols-10 bg-white border p-3 text-center">
                  <span className="col-span-5 w-full flex items-center">
                    <img
                      src={item.product.avatar}
                      alt="avatar"
                      className="w-44 h-w-44 object-cover"
                    />
                    <span className="text-left">
                      <span className="flex gap-2">
                        <p className="font-medium">Title:</p>
                        <p>{item.product.title}</p>
                      </span>
                      <span className="flex gap-3">
                        <p className="font-medium">Price:</p>
                        <p>{formatMoney(item.product.price) + " VND"}</p>
                      </span>
                      <span className="flex gap-2">
                        <p className="font-medium">Quantity:</p>
                        <p>{item.quantity}</p>
                      </span>
                    </span>
                  </span>
                  <span className="col-span-1 w-full justify-center flex items-center font-semibold text-main">
                    {/* {product.status} */}
                  </span>
                  <span className="col-span-2 w-full justify-center flex items-center font-semibold ">
                    {formatMoney(item.product.price * item.quantity) + "VND"}
                  </span>
                  <span className="col-span-2 w-full justify-center flex items-center ">
                    <button className="border p-2 hover:bg-gray-50">
                      Cancel order
                    </button>
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
