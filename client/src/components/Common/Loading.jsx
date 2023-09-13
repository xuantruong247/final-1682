import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-overlay z-100">
      <HashLoader color="#ee3131" />
    </div>
  );
};

export default Loading;
