import React, { useCallback, useEffect, useState } from "react";
import {
  apiDeleteOrder,
  apiGetOrders,
  apiUpdateStatus,
} from "../../../apis/order";
import moment from "moment";
import Swal from "sweetalert2";
import path from "../../../utils/path";
import { Pagination, Select, ShowDetailOrder } from "../../../components";
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
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [getOrder, setGetOrder] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filterOrder, setFilterOrder] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [update, setUpdate] = useState(false);
  const [startDays, setStartDays] = useState("");
  const [endDays, setEndDays] = useState("");
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const fetchOrder = async (params) => {
    const response = await apiGetOrders(params);
    setGetOrder(response.data.getOrders);
    setFilterOrder(response.data.getOrders);
    setTotalCount(response.data.counts);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (startDays) {
      queries.startDays = startDays;
    }
    if (endDays) {
      queries.endDays = endDays;
    }
    fetchOrder(queries);
  }, [params, update, startDays, endDays]);

  useEffect(() => {
    const filtered = getOrder.filter((order) => {
      return order._id.toLowerCase().includes(searchOrder);
    });
    setFilterOrder(filtered);
  }, [searchOrder, getOrder]);

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

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        Manage Orders
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-center gap-20 items-center py-1">
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
          <input
            type="text"
            value={searchOrder}
            onChange={(e) => {
              setSearchOrder(e.target.value);
            }}
            placeholder="Search..."
            className="px-4 py-2 rounded-sm my-2 border w-[500px] outline-none placeholder:text-sm placeholder:italic"
          />
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
                  <td className="px-4 py-2">{item.total}</td>
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
                      <span>{item.statusPayment}</span>
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
                      <span>{item.statusOrder}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(item.createdAt).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2 flex">
                    <button
                      onClick={() => {
                        handleShowDetail(item._id);
                      }}
                      className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                    >
                      Order detail
                    </button>
                    {watch("_id") === item._id ? (
                      <button
                        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded mr-3"
                        onClick={() => {
                          reset({
                            email: "",
                            firstname: "",
                            lastname: "",
                            role: "",
                            phone: "",
                            status: "",
                            _id: "",
                          });
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <div
                        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded mr-3"
                        onClick={() => {
                          reset(item);
                        }}
                      >
                        Edit
                      </div>
                    )}
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="cursor-pointer bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full flex justify-center items-center">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default ManageOder;
