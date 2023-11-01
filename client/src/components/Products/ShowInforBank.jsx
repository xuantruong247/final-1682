import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/category/categorySlide";
import Loading from "../Common/Loading";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { apiCancelOrder } from "../../apis";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";

const ShowInforBank = ({ oid }) => {
  const modalRef = useRef();
  const form = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  const sendMail = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure....",
      text: "Are you ready to cancel this order?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        emailjs
          .sendForm(
            "service_ssw5vld",
            "template_kf69jxm",
            form.current,
            "t3z_Q6t1bSgI7s4R4"
          )
          .then((emailResult) => {
            if (emailResult) {
              const rep = apiCancelOrder(oid);
              if (rep) {
                Swal.fire({
                  icon: "success",
                  text: "Request sent successfully",
                });
                window.location.reload(`/${path.MEMBER}/${path.HISTORY}`);
              }
            }
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
          })
          .catch((error) => {
            console.log(error.text);
          });
      }
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col items-center justify-center gap-4"
    >
      <form ref={form} onSubmit={sendMail} className=" flex flex-col gap-2">
        <input
          type="text"
          name="pid_product"
          defaultValue={oid}
          readOnly
          className="p-2 w-full outline-none border"
          hidden
        />
        <div className="flex w-full gap-2 items-center">
          <label htmlFor="reason">
            Reason:
          </label>
          <input
            type="text"
            name="reason"
            required
            className="p-1 w-full outline-none border"
          />
        </div>

        <div className="flex justify-center">
          <button className="p-2 w-full bg-main text-white hover:bg-gray-800">
            Request cancellation and refund
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShowInforBank;
