import React from "react";
import { useForm } from "react-hook-form";
import { apiCreateBrand } from "../../../apis";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../../components";

const CreateBrand = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({});

  const handleCreateBrand = async (data) => {
    const response = await apiCreateBrand(data);
    console.log(response);

    if (response) {
      Swal.fire({
        icon: "success",
        text: "Create brand successfully!!",
      });
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Create brand fail",
      });
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Create New Brand</span>
      </h1>
      <div className="px-4 ">
        <form onSubmit={handleSubmit(handleCreateBrand)}>
          <div className="my-4">
            <InputForm
              label="Name brand"
              register={register}
              errors={errors}
              id="title"
              placeholder="Name of new brand"
              validate={{ required: "Need fill this field" }}
            />
          </div>
          <div className="mt-10">
            <Button
              style={
                "mt-10 px-4 py-2 rounded-md text-white bg-main text-semibold w-full"
              }
            >
              Create new brand
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;
