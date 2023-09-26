import React, { memo, useEffect, useState } from "react";
import { apiGetBlogs } from "./../../apis/blogs";
import Slider from "react-slick";
import {  useNavigate } from "react-router-dom";
import path from "./../../utils/path";
import { motion } from "framer-motion";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const BlogsComponent = () => {
  const [getBlogs, setGetBlogs] = useState([]);
  const navigate = useNavigate()
  const fetchBlogs = async () => {
    const response = await apiGetBlogs();
    console.log(response);
    setGetBlogs(response.data.getBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[20px] py-[15px] border-b-2 border-main">
        BlogsComponent
      </h3>
      <Slider {...settings} className="custome-slider my-2">
        {getBlogs?.map((item, index) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            key={index}
            onClick={() => { 
              navigate(`/${path.DETAIL_BLOG}/${item?._id}/${item?.title}`)
             }}
            className="px-2 h-64 cursor-pointer hover:text-main hover:font-semibold"
          >
            <img
              src={item?.imageThum}
              alt="imageThum"
              className="object-contain h-52"
            />
            <h2 className="text-sm">{item?.title}</h2>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(BlogsComponent);
