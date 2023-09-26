import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteBlog, apiGetBlogs } from "../../../apis";
import Swal from "sweetalert2";
import UpdateBlog from "./UpdateBlog";
import DOMPurify from "dompurify";
import path from "../../../utils/path";

const ManageBlog = () => {
  const [getBlog, setGetBlog] = useState([]);
  const [editBlog, setEditBlog] = useState(false);

  const fetchBlogs = async () => {
    const response = await apiGetBlogs();
    setGetBlog(response.data.getBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (bid) => {
    Swal.fire({
      title: "Are you sure....",
      text: "Are you ready remove this blog?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteBlog(bid);
        if (response) {
          Swal.fire({
            icon: "success",
            text: "Delete blog success",
          });
          window.location.reload(`/${path.ADMIN}/${path.MANAGE_BLOG}`)
        }
      }
    });
  };
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-full relative">
      {editBlog && (
        <div className="absolute inset-0 bg-sky-100 h-[1250px]">
          <UpdateBlog
            setEditBlog={setEditBlog}
            editBlog={editBlog}
          />
        </div>
      )}
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        Manage Blogs
      </h1>
      <div className="w-full p-4">
        <table className="table w-full mb-3 border-b border-sky-300 text-left">
          <thead className="bg-sky-500 text-white border text-[15px] rounded-sm">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getBlog?.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.imageThum}
                    alt="avatar"
                    className="w-32 h-24 object-cover "
                  />
                </td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2 text-left">
                  {item?.description?.length > 1 &&
                    item?.description?.map((el, index) => (
                      <p key={index}>{truncateDescription(el, 100)}</p>
                    ))}
                  {item?.description?.length === 1 && (
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          truncateDescription(item?.description[0], 100)
                        ),
                      }}
                    ></div>
                  )}
                </td>
                <td className="px-4 my-10 flex justify-center items-center">
                  <div
                    className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                    onClick={() => {
                      setEditBlog(item);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    onClick={() => {
                      handleDeleteBlog(item._id);
                    }}
                    className="cursor-pointer bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlog;
