import React, { useCallback, useEffect, useState } from "react";
import {
  apiDeleteOrder,
  apiGetOrders,
  apiUpdateStatus,
} from "../../../apis/order";
import moment from "moment";
import Swal from "sweetalert2";
import path from "../../../utils/path";
import {
  Pagination,
  Select,
  ShowDetailOrder,
  ShowQRCode,
} from "../../../components";
import { apiDetailOrder } from "./../../../apis/order";
import { useDispatch } from "react-redux";
import { showModal } from "../../../redux/category/categorySlide";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { statusOrder, statusPayment } from "../../../utils/contants";

const ManageOder = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    statusOrder: "",
    statusPayment: "",
    _id: "",
  });

  const [statusOrderId, setStatusOrderId] = useState([]);
  const [statusPaymentId, setStatusPaymentId] = useState([]);
  const [getOrder, setGetOrder] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOrder, setFilterOrder] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [update, setUpdate] = useState(false);
  const [startDays, setStartDays] = useState("");
  const [endDays, setEndDays] = useState("");
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const fetchOrder = async (queries) => {
    const response = await apiGetOrders(queries);
    setGetOrder(response.data.getOrders);
    setFilterOrder(response.data.getOrders);
    setTotalCount(response.data.counts);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (statusOrderId) {
      queries.statusOrderId = statusOrderId;
    }
    if (statusPaymentId) {
      queries.statusPaymentId = statusPaymentId;
    }
    if (startDays) {
      queries.startDays = startDays;
    }
    if (endDays) {
      queries.endDays = endDays;
    }
    fetchOrder(queries);
  }, [params, update, startDays, endDays, statusOrderId, statusPaymentId]);

  useEffect(() => {
    const filtered = getOrder.filter((order) => {
      return order._id.toLowerCase().includes(searchOrder);
    });
    setFilterOrder(filtered);
  }, [searchOrder, getOrder]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateStatus(data, watch("_id"));
    if (response) {
      Swal.fire({
        icon: "success",
        text: "Update status success!!",
      });
      reset({ statusOrder: "", statusPayment: "", _id: "" });
      render();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Something went wrong!",
      });
    }
  };

  const handleShowDetail = async (oid) => {
    const response = await apiDetailOrder(oid);
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: (
          <ShowDetailOrder detailOrder={response.data.getDetailOrder} />
        ),
      })
    );
  };

  const handleDelete = async (oid) => {
    Swal.fire({
      title: "Are you sure....",
      text: "Are you ready remove this order?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteOrder(oid);
        if (response) {
          Swal.fire({
            icon: "success",
            text: "Delete order success",
          });
          window.location.reload(`/${path.ADMIN}/${path.MANAGE_ORDER}`);
        }
      }
    });
  };

  const handleRefund = async (oid) => {
    const response = await apiDetailOrder(oid);
    dispatch(
      showModal({
        isShowModal: true,
        modalChildren: <ShowQRCode id={response.data.getDetailOrder._id} />,
      })
    );
  };

  const [sortOrder, setSortOrder] = useState("desc");

  const handleSortByTotal = () => {
    const sortedOrders = [...filterOrder];
    if (sortOrder === "asc") {
      sortedOrders.sort((a, b) => b.total - a.total);
      setSortOrder("desc"); 
    } else {
      sortedOrders.sort((a, b) => a.total - b.total); 
      setSortOrder("asc");
    }
    setFilterOrder(sortedOrders);
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Manage Orders</span>
      </h1>
      <div className="w-full p-4">
        <input
          type="text"
          value={searchOrder}
          onChange={(e) => {
            setSearchOrder(e.target.value);
          }}
          placeholder="Search..."
          className="px-4 py-2 rounded-sm my-2 border w-full outline-none placeholder:text-sm placeholder:italic"
        />
        <div>
          <button
            className="p-2 bg-red-500"
            onClick={() => {
              handleSortByTotal();
            }}
          >
            Sort by total
          </button>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="flex">
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-semibold px-1">
                Sort by date
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="rounded-sm border p-2"
                  value={startDays}
                  onChange={(e) => setStartDays(e.target.value)}
                />
                <input
                  type="date"
                  className="rounded-sm border p-2"
                  value={endDays}
                  onChange={(e) => setEndDays(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="px-1 font-semibold">
              Sort by Status Payment
            </label>
            <select
              className="p-2"
              value={statusPaymentId}
              onChange={(e) => {
                setStatusPaymentId(e.target.value);
              }}
            >
              <option value="">---CHOOSE---</option>
              {statusPayment.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="px-1 font-semibold">
              Sort by Status Order
            </label>
            <select
              className="p-2"
              value={statusOrderId}
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
        </div>

        <form onSubmit={handleSubmit(handleUpdate)}>
          {watch("_id") && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded"
            >
              Update
            </button>
          )}
          <table className="table w-full mb-3 border-b border-sky-300 text-center">
            <thead className="bg-sky-500 text-white border text-[15px] rounded-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status Payment</th>
                <th className="px-4 py-2">Status Order</th>
                <th className="px-4 py-2">CreatedAt</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterOrder?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {item?.postedBy?.firstname} {item?.postedBy?.lastname}
                  </td>
                  <td className="px-4 py-2">{item.total}$</td>
                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"statusPayment"}
                        options={statusPayment}
                      />
                    ) : (
                      <span
                        className={
                          item.statusPayment === "Cancelled"
                            ? "text-main font-medium"
                            : ""
                        }
                      >
                        {item.statusPayment}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"statusOrder"}
                        options={statusOrder}
                      />
                    ) : (
                      <span
                        className={
                          item.statusOrder === "Refunded"
                            ? "text-main font-medium"
                            : ""
                        }
                      >
                        {item.statusOrder}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(item.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2 flex  gap-2 justify-end">
                    {item.statusOrder === "Processing" && (
                      <div
                        onClick={() => {
                          handleRefund(item._id);
                        }}
                        className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-2 rounded flex justify-center items-center"
                      >
                        Refund
                      </div>
                    )}
                    <div
                      onClick={() => {
                        handleShowDetail(item._id);
                      }}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded"
                    >
                      Order detail
                    </div>
                    {watch("_id") === item._id ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3 flex justify-center items-center"
                        onClick={() => {
                          reset({
                            statusOrder: "",
                            statusPayment: "",
                            _id: "",
                          });
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <div
                        className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded flex justify-center items-center"
                        onClick={() => {
                          reset(item);
                        }}
                      >
                        Edit
                      </div>
                    )}
                    <div
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="cursor-pointer bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded flex justify-center items-center"
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ManageOder;
