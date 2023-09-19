import React from "react";
import { Breakcrumb } from "../../components";
import { AiOutlineRight, AiOutlineMail } from "react-icons/ai";
import { BiStreetView, BiCheck } from "react-icons/bi";
import { MdPhone } from "react-icons/md";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Contact = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCf7I0gX6oVpc7HX7DU1AvLdhQm7MWeOnQ",
  });

  if (!isLoaded) return <div>Loading....</div>;

  const center = {
    lat: 10.81334,
    lng: 106.669484,
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium">Contact</h3>
          <span className="flex gap-1">
            <Breakcrumb />
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              <span>Contact</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-main mx-auto mt-4">
        <div>
          <GoogleMap
            zoom={15}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </div>
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
          <div className=" flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <input
                type="text"
                placeholder="Name"
                className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
              />
            </div>
            <input
              type="phone"
              placeholder="Phone Number"
              className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
            />
            <textarea
              cols=""
              rows="4"
              placeholder="Message"
              className="p-2 w-full bg-gray-200 placeholder:px-2 placeholder:text-sm outline-none"
            />
            <div className="text-end">
              <button className="p-2 w-[80px] bg-main text-white hover:bg-gray-800">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
