import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { AiOutlineMail } from "react-icons/ai";
import { BiStreetView, BiCheck } from "react-icons/bi";
import { MdPhone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/category/categorySlide";
import Loading from "./Loading";
import Swal from "sweetalert2";

const ContactConponent = () => {
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    emailjs
      .sendForm(
        "service_6oghuci",
        "template_sdlcrtd",
        form.current,
        "t3z_Q6t1bSgI7s4R4"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
          if (result) {
            Swal.fire({
              icon: "success",
              text: "Send email successfully",
            });
            form.current.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="flex w-main mx-auto mt-10 mb-20">
      <div className="flex-5">
        <div className="flex flex-col text-sm gap-2">
          <span className="flex items-center gap-2">
            <BiStreetView color="red" size={20} />
            <span>
              Address: 15/1b Hong Ha, Ward 2, Tan Binh District, Ho Chi Minh
              City
            </span>
          </span>
          <span className="flex items-center gap-2">
            <BiCheck color="red" size={20} />
            <span>Opening hours</span>
          </span>
          <span className="ml-4 flex flex-col gap-2">
            <span>Mon-Fri: 11:00 - 20:00</span>
            <span>Sat: 10:00 - 20:00</span>
            <span>Sun: 19:00 - 20:00</span>
          </span>
          <span className="flex items-center gap-2">
            <AiOutlineMail color="red" size={16} />
            <span>Email: truongnxgcs190087@fpt.edu.vn</span>
          </span>
          <span className="flex items-center gap-2">
            <MdPhone color="red" size={16} />
            <span>Phone: (0856) 93 2222</span>
          </span>
        </div>
      </div>
      <div className="flex-5">
        <form ref={form} onSubmit={sendEmail} className=" flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <input
              type="text"
              required
              name="user_name"
              placeholder="Name"
              className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
            />
            <input
              type="email"
              required
              name="user_email"
              placeholder="Email"
              className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
            />
          </div>
          <input
            type="number"
            name="user_phone"
            required
            placeholder="Phone Number"
            className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
          />
          <textarea
            cols=""
            rows="4"
            name="message"
            placeholder="Message"
            className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
          />
          <div className="text-end">
            <button className="p-2 w-[80px] bg-main text-white hover:bg-gray-800">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactConponent;
