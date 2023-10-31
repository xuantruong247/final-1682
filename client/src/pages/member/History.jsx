import React, { Fragment, useEffect, useRef, useState } from "react";
import { apiGetHistoryBuyOrder } from "./../../apis/user";
import { formatMoney } from "../../utils/helpers";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/category/categorySlide";
import { ShowInforBank } from "../../components";
import { apiGetUserOrders } from "../../apis";
import { useSearchParams } from "react-router-dom";
import { statusOrder } from "../../utils/contants";

const History = () => {
  const [getHistory, setGetHistory] = useState([]);
  const [statusOrderId, setStatusOrderId] = useState([]);
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const fetchApiGetHistory = async (queries) => {
    const response = await apiGetUserOrders(queries);
    console.log(response.data.getOrders);
    setGetHistory(response.data.getOrders);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (statusOrderId) {
      queries.statusOrderId = statusOrderId;
    }
    fetchApiGetHistory(queries);
  }, [params, statusOrderId]);

  const handleCancelOrder = (oid) => {
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <ShowInforBank oid={oid} />,
      })
    );
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Purchase history</span>
      </h1>
      <div className="flex justify-end p-2 w-main mx-auto">
        <select
          className="p-2"
          onChange={(e) => {
            setStatusOrderId(e.target.value);
          }}
        >
          <option value="">---CHOOSE---</option>
          {statusOrder.map((item, index) => (
            <option value={item.value} key={index}>
              {item.text}
            </option>
          ))}
        </select>
      </div>
      <div className="w-main mx-auto">
        <div className="px-2">
          <table className="table w-full mb-3 border-b border-sky-300 bg-white">
            <thead className="border text-xl rounded-sm">
              <tr>
                <th className="p-4">PRODUCTS</th>
                <th className="p-4">TOTAL</th>
                <th className="p-4">STATUS ORDER</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {getHistory.map((el) => (
                <tr key={el._id} className="border-2">
                  <td className="px-4 py-2">
                    <span className="flex flex-col gap-2">
                      {el.products.map((item, index) => (
                        <span key={index}>
                          <span className="flex gap-2 items-center">
                            <img
                              src={item.product.avatar}
                              alt="img"
                              className="w-20 h-20 rounded-md object-cover"
                            />
                            <span>
                              <p className="text-main">{item.product.title}</p>
                              <span className="flex gap-2">
                                <p>Price: </p>
                                <p className="text-main">
                                  {item.product.price}
                                </p>
                              </span>
                              <span className="flex gap-2">
                                <p>Quantity: </p>
                                <p className="text-main">{item.quantity}</p>
                              </span>
                            </span>
                          </span>
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className="text-center text-lg ">{el.total} $</td>
                  <td className="text-center text-lg">{el.statusOrder}</td>
                  <td className="text-center">
                    {el.statusOrder === "Preparing the order" && (
                      <button
                        onClick={() => {
                          handleCancelOrder(el._id);
                        }}
                        className="border p-2 hover:bg-gray-100"
                      >
                        Cancel order
                      </button>
                    )}
                    {el.statusOrder === "Processing" && (
                      <span>Yêu cầu đang được sử lý</span>
                    )}
                    {el.statusOrder === "The order has been shipped" && (
                      <span>Đơn hàng đang được giao đến bạn</span>
                    )}
                    {el.statusOrder ===
                      "The delivery person is delivering to you" && (
                      <span>Đơn hàng đang được giao đến bạn</span>
                    )}
                    {el.statusOrder === "Refunded" && (
                      <span>Đơn hàng đang được hoàn tiền</span>
                    )}
                    {el.statusOrder === "Cancelled" && (
                      <span>Đơn hàng đã được huỷ</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
