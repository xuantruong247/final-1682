import React, { useEffect, useState } from "react";
import { apiDeleteOrder, apiGetOrders } from "../../../apis/order";
import moment from "moment";
import Swal from "sweetalert2";
import path from "../../../utils/path";
import { Pagination, ShowDetailOrder } from "../../../components";
import { apiDetailOrder } from "./../../../apis/order";
import { useDispatch } from "react-redux";
import { showModal } from "../../../redux/category/categorySlide";

const ManageOder = () => {
  const [getOrder, setGetOrder] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const fetchOrder = async () => {
    const response = await apiGetOrders();
    console.log(response);
    setGetOrder(response.data.getOrders);
    setTotalCount(response.data.counts);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleShowDetail = async (oid) => {
    const response = await apiDetailOrder(oid);
    console.log(response.data.getDetailOrder);
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
      text: "Are you ready remove this blog?",
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

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        Manage Orders
      </h1>
      <div className="w-full p-4">
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
            {getOrder?.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {item?.postedBy?.firstname} {item?.postedBy?.lastname}
                </td>
                <td className="px-4 py-2">{item.total}</td>
                <td className="px-4 py-2">{item.statusPayment}</td>
                <td className="px-4 py-2">{item.statusOrder}</td>
                <td className="px-4 py-2">
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      handleShowDetail(item._id);
                    }}
                    className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                  >
                    Order detail
                  </button>
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
        <div className="w-full flex justify-center items-center">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default ManageOder;
