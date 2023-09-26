import React, { useEffect, useState } from "react";
import { BlogCard, Breakcrumb, Pagination } from "../../components";
import { AiOutlineRight } from "react-icons/ai";
import { apiGetBlogs } from "../../apis";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0)
  const fetchApiBlogs = async () => {
    const repsonse = await apiGetBlogs();
    if (repsonse) {
      setBlogs(repsonse.data.getBlogs);
      setTotalCounts(repsonse.data.counts)
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
      <div className="w-main mx-auto py-4">
        {blogs?.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            imageThum={blog.imageThum}
            createdAt={blog.createdAt}
            blogs={blog}
          />
        ))}
      <div className="w-full flex justify-center items-center pt-4">
        <Pagination totalCount={totalCounts}/>
      </div>
      </div>
    </div>
  );
};

export default Blog;
