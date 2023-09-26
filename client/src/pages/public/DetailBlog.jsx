import React, { useEffect, useRef, useState } from "react";
import { apiGetblog } from "../../apis";
import { useNavigate, useParams } from "react-router-dom";
import { Breakcrumb } from "../../components";
import { AiOutlineRight } from "react-icons/ai";
import path from "../../utils/path";
import DOMPurify from "dompurify";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GrView } from "react-icons/gr";

const DetailBlog = () => {
  const [getBlog, setGetBlog] = useState(null);
  const titleRef = useRef();
  const { bid } = useParams();
  const navigate = useNavigate();

  const fetchGetBlog = async () => {
    const response = await apiGetblog(bid);
    setGetBlog(response?.data?.getBlog);
  };

  console.log(getBlog?.likes);

  useEffect(() => {
    if (bid) {
      fetchGetBlog();
    }
  }, [bid]);
  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div ref={titleRef} className="w-main flex flex-col gap-1">
          <h3 className="font-medium uppercase">{getBlog?.title}</h3>
          <span className="flex gap-1">
            <Breakcrumb />
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              <span
                className="cursor-pointer hover:text-main"
                onClick={() => {
                  navigate(`/${path.BLOG}`);
                }}
              >
                Blog
              </span>
            </span>
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              <span>{getBlog?.title}</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-main mx-auto">
        {getBlog?.description?.length > 1 &&
          getBlog?.description?.map((item, index) => <p key={index}>{item}</p>)}
        {getBlog?.description?.length === 1 && (
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(getBlog?.description[0]),
            }}
          ></div>
        )}
      </div>
      <div className="w-main mx-auto flex justify-end pb-4">
        <div className="flex gap-4 mx-10">
          <p className="flex items-center">
            {getBlog?.likes || 0} <AiFillLike />
          </p>
          <p className="flex items-center">
          {getBlog?.dislikes || 0} <AiFillDislike />
          </p>
          <p className="flex items-center">
            {getBlog?.numberViews || 0} <GrView />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
