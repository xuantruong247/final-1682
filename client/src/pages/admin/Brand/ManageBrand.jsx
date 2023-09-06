import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiDeleteBrand, apiGetBrand, apiUpdateBrand } from "../../../apis";
import { InputForm } from "../../../components";
import Swal from "sweetalert2";

const ManageBrand = () => {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    _id: "",
    title: "",
  });

  const [mapBrands, setMapBrands] = useState([]);
  const [update, setUpdate] = useState(false);

  const fetchApiGetBrands = async () => {
    const response = await apiGetBrand();
    setMapBrands(response.data.getBrandCategory);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    fetchApiGetBrands();
  }, [update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateBrand(data, watch("_id"));
    if (response) {
      Swal.fire({
        icon: "success",
        text: response.data.updateBrand,
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
        text: response.data.updateBrand,
      });
    }
  };

  const handleDelete = async (bid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteBrand(bid);
        if (response) {
          Swal.fire({
            icon: "success",
            text: response.data.deletedBrand,
          });
          render();
        }
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Manage Brands</span>
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
              {mapBrands?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <InputForm
                        register={register}
                        id="title"
                        errors={errors}
                        fullWidth
                        validate={{ required: "Require fill" }}
                      />
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    {watch("_id") === item._id ? (
                      <div
                        onClick={() => {
                          reset({
                            _id: "",
                            title: "",
                          });
                        }}
                        className="bg-green-500 cursor-pointer hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                      >
                        Back
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          reset(item);
                        }}
                        className="bg-green-500 cursor-pointer hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
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

export default ManageBrand;
