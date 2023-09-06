import React from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../../components";
import { apiCreateCategory } from "../../../apis";
import Swal from "sweetalert2";

const CreateCategory = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({});

  const handleCreateCategory = async (data) => {
    const response = await apiCreateCategory(data);
    if (response) {
      Swal.fire({
        icon: "success",
        text: "Create category successfully!!",
      });
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Create category fail",
      });
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Create New Category</span>
      </h1>
      <div className="px-4 ">
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <div className="my-4">
            <InputForm
              label="Name category"
              register={register}
              errors={errors}
              id="title"
              placeholder="Name of new category"
              validate={{ required: "Need fill this field" }}
            />
          </div>
          <div className="mt-10">
            <Button
              style={
                "mt-10 px-4 py-2 rounded-md text-white bg-main text-semibold w-full"
              }
            >
              Create new category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
