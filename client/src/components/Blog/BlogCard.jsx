import React, { memo } from "react";
import Button from "../Buttons/Button";
import { BsArrowRightShort } from "react-icons/bs";

const BlogCard = ({ title, description, image }) => {
  return (
    <div className="w-main mx-auto border p-2 rounded-lg my-2 grid grid-cols-6">
      {/* <div className="flex"> */}
      <div className="col-span-1">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image}
          alt="image"
        />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="flex items-center p-4 justify-between">
            <div>
              <div className="flex gap-2">
                <p>like</p>
                <p>dislike</p>
                <p>comment</p>
                <p>view</p>
              </div>
              <div>by people update</div>
            </div>
            <Button
              style={
                "px-3 py-2 rounded-md text-white bg-main text-semibold w-full flex items-center hover:bg-black"
              }
            >
              Read more
              <BsArrowRightShort size={25} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BlogCard);
