import React from "react";
import notfound from "../../assets/image/notfound.svg";
import { Link } from "react-router-dom";
import path from "../../utils/path";

const NotFound404 = () => {
  return (
    <div className="w-full flex flex-col py-6 items-center gap-12">
      <img src={notfound} alt="notfound" className="h-[60vh]" />
      <span className="text-xl">
        You didn't break the internet, but we can't find what you are looking
        for.
      </span>
      <Link to={`/${path.HOME}`} className="bg-black py-2 text-white w-[100px] flex justify-center rounded-lg">Go back</Link>
    </div>
  );
};

export default NotFound404;
