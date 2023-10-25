import React from "react";
import { Breakcrumb, ContactConponent } from "../../components";
import { AiOutlineRight } from "react-icons/ai";
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
      <ContactConponent />
    </div>
  );
};

export default Contact;
