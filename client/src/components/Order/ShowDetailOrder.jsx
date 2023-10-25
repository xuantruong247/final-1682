import React, { useEffect, useRef } from "react";
import { formatMoney } from "../../utils/helpers";

const ShowDetailOrder = ({ detailOrder }) => {
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col items-center justify-center gap-4"
    >
      <div className="flex flex-col gap-3">
        <span className="flex gap-2 justify-center">
          <b>Name user:</b>
          <p>
            {detailOrder?.postedBy?.firstname} {detailOrder?.postedBy?.lastname}
          </p>
        </span>
        <div className="w-full">
          <table className="table w-full mb-3 border-b border-sky-300 text-left">
            <thead className="bg-sky-500 text-white border text-[15px] rounded-sm">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Avatar</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {detailOrder?.products?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={item?.product?.avatar}
                      alt={item?.product?.title}
                      className="w-32 h-24"
                    />
                  </td>
                  <td className="px-4 py-2 border">{item?.product?.title}</td>
                  <td className="px-4 py-2 border text-center">
                    {item?.quantity}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatMoney(item?.product?.price) + "VND"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="flex gap-2 justify-center">
            <b>Total:</b>
            <p>{detailOrder?.total} $</p>
          </span>
          <span className="flex gap-2 justify-center">
            <b>Status Payment:</b>
            <p>{detailOrder?.statusPayment}</p>
          </span>
          <span className="flex gap-2 justify-center">
            <b>Status Order:</b>
            <p>{detailOrder?.statusOrder}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowDetailOrder;
