import React, { memo } from "react";
import Button from "../Buttons/Button";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import moment from "moment";
import DOMPurify from "dompurify";

const BlogCard = ({ title, description, imageThum, createdAt, blogs }) => {
  const navigate = useNavigate();
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-main mx-auto border px-2 rounded-lg my-2 grid grid-cols-6">
      <div className="col-span-1 my-20 text-center">
        <img
          className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
          src={imageThum}
          alt="image"
        />
      </div>
      <div className="col-span-5">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold w-full border-b tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <div className="flex flex-col gap-2">
              <p className="text-xs italic font-light text-gray-500">{`${moment(
                createdAt
              ).format("DD - MM - YYYY")}`}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {description.length > 1 &&
                  description?.map((item, index) => (
                    <p key={index}>{truncateDescription(item, 100)}</p>
                  ))}
                {description?.length === 1 && (
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateDescription(description[0], 200)
                      ),
                    }}
                  ></div>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="flex items-center">
                  {blogs?.likes || 0} <AiFillLike />
                </p>
                <p className="flex items-center">
                  {blogs?.dislikes || 0} <AiFillDislike />
                </p>
                <p className="flex items-center">
                  {blogs?.numberViews || 0} <GrView />
                </p>
              </div>
            </div>
            <Button
              handlerOnclick={() => {
                navigate(`/${path.DETAIL_BLOG}/${blogs?._id}/${blogs?.title}`);
              }}
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
