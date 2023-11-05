import React, { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { apiRefundPaypal } from "../../apis";
import path from "../../utils/path";
import Swal from "sweetalert2";

const ShowQRCode = ({ id }) => {
  const modalRef = useRef();
  const { current } = useSelector((state) => state.user);
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  const qrData = `"Information bank"${current.numberBank}${current.nameBank}`;

  const finalRefund = async () => {
    const response = await apiRefundPaypal(id);
    if (response) {
      Swal.fire({
        icon: "success",
        text: "Refund order success!",
      });
      window.location.reload(`/${path.ADMIN}/${path.MANAGE_ORDER}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-gray-100 w-[700px] p-4 flex flex-col items-center justify-center gap-4"
    >
      <div className="flex flex-col gap-3 items-center">
        <div className="p-4 bg-white rounded-lg">
          <QRCode value={qrData} />
        </div>
        <button
          onClick={finalRefund}
          className="cursor-pointer bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-2 rounded"
        >
          Refund confirmation
        </button>
      </div>
    </div>
  );
};

export default ShowQRCode;
