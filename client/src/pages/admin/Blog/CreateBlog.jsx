import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  Loading,
  MarkdownEditor,
} from "../../../components";
import { BiImageAdd } from "react-icons/bi";
import { getBase64 } from "../../../utils/helpers";
import { apiCreateBlog } from "../../../apis";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showModal } from "../../../redux/category/categorySlide";

const CreateBlog = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [payload, setPayload] = useState({
    description: "",
  });
  const dispatch = useDispatch();

  const [invalidFilds, setInvalidFilds] = useState([]);

  const [preview, setPreview] = useState({
    imageThum: null,
  });
  const handlePreviewImg = async (file) => {
    const base64Img = await getBase64(file);
    setPreview((prev) => ({ ...prev, imageThum: base64Img }));
  };

  useEffect(() => {
    handlePreviewImg(watch("imageThum")[0]);
  }, [watch("imageThum")]);

  const handleCreateBlog = async (data) => {
    const finalPayload = { ...data, ...payload };
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.imageThum) {
      formData.append("imageThum", finalPayload.imageThum[0]);
    }
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateBlog(formData);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response) {
      Swal.fire({
        icon: "success",
        text: "Create blog successfully!!",
      });
      setPayload({
        imageThum: "",
      });
      reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...!",
        text: "Create product fail",
      });
    }
  };

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  return (
    <div className="w-full">
      <h1 className="h-[60px] border-b border-sky-300 text-2xl font-bold flex items-center">
        Create blog
      </h1>
      <div className="px-4">
        <form onSubmit={handleSubmit(handleCreateBlog)}>
          <div className="py-4 flex flex-col gap-16">
            <InputForm
              label="Title"
              register={register}
              errors={errors}
              id="title"
              placeholder="Title of new blog"
              validate={{ required: "Need fill this field" }}
            />
            <MarkdownEditor
              label="Desciption"
              name="description"
              value=""
              changeValue={changeValue}
              invalidFilds={invalidFilds}
              setInvalidFilds={setInvalidFilds}
            />
            <div className="flex flex-col gap-4">
              <span className="font-semibold" htmlFor="">
                Upload Image
              </span>
              <label
                className="h-[105px] cursor-pointer w-full border-2 border-dashed border-gray-400 flex items-center justify-center"
                htmlFor="imageThum"
              >
                <BiImageAdd size={30} />
                <span>Choose file</span>
              </label>
              <input
                hidden
                type="file"
                id="imageThum"
                {...register("imageThum", { required: "Need fill " })}
              />
              {errors["imageThum"] && (
                <small className="text-xs text-red-500">
                  {errors["imageThum"]?.message}
                </small>
              )}
              {preview.imageThum && (
                <div className="flex items-center justify-center">
                  <img
                    src={preview.imageThum}
                    alt="imageThum"
                    className="w-[200px] object-contain"
                  />
                </div>
              )}
            </div>
          </div>
          <Button
            style={
              "my-10 px-4 py-2 rounded-md text-white bg-main text-semibold w-full"
            }
          >
            Create new blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
