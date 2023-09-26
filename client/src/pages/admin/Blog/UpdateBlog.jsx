import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  InputForm,
  Loading,
  MarkdownEditor,
} from "../../../components";
import { BiImageAdd } from "react-icons/bi";
import { getBase64, validate } from "../../../utils/helpers";
import { apiUpdateBlog } from "../../../apis";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showModal } from "../../../redux/category/categorySlide";
import path from "../../../utils/path";

const UpdateBlog = ({ editBlog, setEditBlog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const [invalidFilds, setInvalidFilds] = useState([]);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    imageThum: null,
  });

  const changeValue = useCallback((e) => {
    setPayload(e);
  }, []);

  useEffect(() => {
    if (editBlog) {
      reset({
        title: editBlog.title || "",
      });
      setPayload({
        description:
          typeof editBlog?.description === "object"
            ? editBlog?.description.join(", ")
            : editBlog?.description,
      });
      setPreview({
        imageThum: editBlog?.imageThum || "",
      });
    }
  }, [editBlog, reset]);

  const markdownDescription = useMemo(
    () => payload.description,
    [payload.description]
  );

  const handlePreviewAvt = async (file) => {
    const base64Avt = await getBase64(file);
    setPreview((prev) => ({ ...prev, imageThum: base64Avt }));
  };

  useEffect(() => {
    if (
      watch("imageThum") instanceof FileList &&
      watch("imageThum").length > 0
    ) {
      handlePreviewAvt(watch("imageThum")[0]);
    }
  }, [watch("imageThum")]);

  const handleUpdate = async (data) => {
    const invalids = validate(payload, setInvalidFilds);
    if (invalids === 0) {
      const finalPayload = { ...data, ...payload };
      finalPayload.imageThum =
        data?.imageThum?.length === 0 ? preview.imageThum : data.imageThum[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateBlog(formData, editBlog._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Update blog successfully!!",
        });
        setEditBlog(null);
        window.location.reload(`/${path.ADMIN}/${path.MANAGE_BLOG}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Update blog fail",
        });
      }
    }
  };
  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Update Blog</span>
        <span
          onClick={() => {
            setEditBlog(null);
          }}
          className="my-10 px-4 py-2 rounded-md text-white bg-green-400 text-semibold text-sm cursor-pointer hover:bg-green-600"
        >
          Cancel
        </span>
      </h1>
      <div className="px-4">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="py-4 flex flex-col gap-16">
            <InputForm
              label="Title"
              register={register}
              errors={errors}
              id="title"
              placeholder="Title of new blog"
            />
            <MarkdownEditor
              label="Desciption"
              name="description"
              value={markdownDescription}
              changeValue={changeValue}
              invalidFilds={invalidFilds}
              setInvalidFilds={setInvalidFilds}
            />
            <div className="flex flex-col gap-4">
              <span className="font-semibold">Upload Image</span>
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
                {...register("imageThum")}
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
              "my-10 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 text-semibold w-full"
            }
          >
            Update blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
