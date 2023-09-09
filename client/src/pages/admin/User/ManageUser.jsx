import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "../../../apis/user";
import { InputForm, Pagination, Select } from "../../../components";
import { blockStatus, manageRoles } from "../../../utils/contants";

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
    status: "",
    _id: "",
  });

  const [mapUser, setMapUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [q, setQ] = useState("");
  const [params] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [update, setUpdate] = useState(false);

  const fetchUser = async (params) => {
    const response = await apiGetUsers(params);
    if (response.data.users) {
      setMapUser(response.data.users);
      setFilteredUsers(response.data.users);
      setTotalCount(response.data.counts);
    }
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchUser(queries);
  }, [params, update]);

  useEffect(() => {
    const filtered = mapUser.filter((user) => {
      return (
        user.email.toLowerCase().includes(q) ||
        user.lastname.toLowerCase().includes(q) ||
        user.firstname.toLowerCase().includes(q)
      );
    });
    setFilteredUsers(filtered);
  }, [q, mapUser]);


  // handle edit
  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, watch("_id"));
    if (response) {
      Swal.fire({
        icon: "success",
        text: response.data.updatedUser,
      });
      reset({
        email: "",
        firstname: "",
        lastname: "",
        role: "",
        phone: "",
        status: "",
        _id: "",
      });
      render();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: response.data.updatedUser,
      });
    }
  };

  // handle delete
  const handleDelete = async (uid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you ready remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response) {
          Swal.fire({
            icon: "success",
            text: response.data.deletedUser,
          });
          render();
        }
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Manage Users</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-1">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value.toLowerCase())}
            placeholder="Search..."
            className="px-4 py-2 rounded-sm my-2 border w-[500px] outline-none placeholder:text-sm placeholder:italic"
          />
        </div>
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
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>

                  <td className="px-4 py-2">
                    <span>{item.email}</span>
                  </td>

                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"firstname"}
                        validate={{ required: "Require fill." }}
                      />
                    ) : (
                      <span>{item.firstname}</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={watch("lastname")}
                        id={"lastname"}
                        validate={{ required: "Require fill." }}
                      />
                    ) : (
                      <span>{item.lastname}</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"mobile"}
                        validate={{
                          required: "Require fill.",
                          pattern: {
                            value: /^(09|03|07|08|05)+[0-9]{8}$/gi,
                            message: "invalid phone number",
                          },
                        }}
                        defaultValue={item.mobile}
                      />
                    ) : (
                      <span>{item.mobile}</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"role"}
                        options={manageRoles}
                      />
                    ) : (
                      <span>{item.role}</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {watch("_id") === item._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        id={"isBlocked"}
                        options={blockStatus}
                      />
                    ) : (
                      <span>{item.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    {watch("_id") === item._id ? (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                        onClick={() => {
                          reset({
                            email: "",
                            firstname: "",
                            lastname: "",
                            role: "",
                            phone: "",
                            status: "",
                            _id: "",
                          });
                        }}
                      >
                        Back
                      </button>
                    ) : (
                      <div
                        className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded mr-3"
                        onClick={() => {
                          reset(item);
                        }}
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
        <div className="w-full flex justify-center items-center">
          <Pagination totalCount={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
