import React, { useCallback, useEffect, useState } from "react";
import {
  apiDeleteCategory,
  apiGetCategories,
  apiUpdateCategory,
} from "../../../apis";
import { useForm } from "react-hook-form";
import { InputForm } from "../../../components";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    _id: "",
    title: "",
  });

  const [mapCategory, setMapCategory] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchApiGetCategory = async () => {
    const response = await apiGetCategories();
    setMapCategory(response.data.getProductsCategory);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    fetchApiGetCategory();
  }, [update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateCategory(data, watch("_id"));
    if (response) {
      Swal.fire({
        icon: "success",
        text: response.data.updateProductCategory,
      });
      reset({
        _id: "",
        title: "",
      });
      render();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: response.data.updateProductCategory,
      });
    }
  };

  const handleDelete = async (pcid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteCategory(pcid);
        if (response) {
          Swal.fire({
            icon: "success",
            text: response.data.updateProductCategory,
          });
          render();
        }
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Manage Categorys</span>
      </h1>
      <div className="w-full p-4">
        <form onSubmit={handleSubmit(handleUpdate)}>
          {watch("_id") && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded"
            >
              Update
            </button>
          )}
          <table className="table text-left w-full mb-3 border-b border-sky-300">
            <thead className="bg-sky-500 text-white border text-[15px] rounded-sm">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mapCategory.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id="title"
                        validate={{ required: "Require fill" }}
                      />
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    {watch("_id") === item._id ? (
                      <div
                        className="bg-green-500 cursor-pointer hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                        onClick={() => {
                          reset({
                            _id: "",
                            title: "",
                          });
                        }}
                      >
                        Black
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          reset(item);
                        }}
                        className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                      >
                        Edit
                      </div>
                    )}

                    <div
                      onClick={() => {
                        handleDelete(item._id);
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
        </form>
      </div>
    </div>
  );
};

export default ManageCategory;
