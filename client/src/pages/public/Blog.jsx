import React, { useEffect, useState } from "react";
import { BlogCard, Breakcrumb } from "../../components";
import { AiOutlineRight } from "react-icons/ai";
import { getApiBlogs } from "../../apis";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchApiBlogs = async () => {
    const repsonse = await getApiBlogs();
    console.log(repsonse);
    if (repsonse) {
      setBlogs(repsonse.data.getBlogs);
    }
  };

  useEffect(() => {
    fetchApiBlogs();
  }, []);

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium">Blog</h3>
          <span className="flex gap-1">
            <Breakcrumb />
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              <span>Blog</span>
            </span>
          </span>
        </div>
      </div>
      <div className="w-main mx-auto mt-4">
        {blogs?.map((blog,index)=>(
          <BlogCard
          key={index}
          title={blog.title}
          description={blog.description}
          image={blog.image}
        />
        ))}
      </div>
    </div>
  );
};

export default Blog;
