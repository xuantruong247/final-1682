import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  InputForm,
  Loading,
  MarkdownEditor,
  Select,
} from "../../../components";
import { BiImageAdd } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { getBase64, validate } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { apiUpdateProduct } from "../../../apis";
import { showModal } from "../../../redux/category/categorySlide";
import Swal from "sweetalert2";

const UpdateProduct = ({ editProduct, setEditProduct, render }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    description: "",
  });

  const [preview, setPreview] = useState({
    avatar: null,
    images: [],
  });

  useEffect(() => {
    if (editProduct) {
      reset({
        title: editProduct.title || "",
        quantity: editProduct.quantity || "",
        price: editProduct.price || "",
        brand_id: editProduct.brand._id || "",
        category_id: editProduct.category._id || "",
      });
      setPayload({
        description:
          typeof editProduct?.description === "object"
            ? editProduct?.description.join(", ")
            : editProduct?.description,
      });
      setPreview({
        avatar: editProduct?.avatar || "",
        images: editProduct?.images || [],
      });
    }
  }, [editProduct, reset]);

  const [invalidFilds, setInvalidFilds] = useState([]);

  const changeValue = useCallback((e) => {
    setPayload(e);
  }, []);

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const handlePreviewAvt = async (file) => {
    const base64Avt = await getBase64(file);
    setPreview((prev) => ({ ...prev, avatar: base64Avt }));
  };

  useEffect(() => {
    if (watch("avatar") instanceof FileList && watch("avatar").length > 0) {
      handlePreviewAvt(watch("avatar")[0]);
    }
  }, [watch("avatar")]);

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        Swal.fire({
          icon: "warning",
          title: "File not supported!!",
        });
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
  }, [watch("images")]);

  const handleUpdate = async (data) => {
    const invalids = validate(payload, setInvalidFilds);
    if (invalids === 0) {
      if (data.category_id) {
        data.category = categories?.find(
          (el) => el._id === data.category_id
        )?.title;
      }
      if (data.brand_id) {
        data.brand = brands?.find((el) => el._id === data.brand_id)?.title;
      }
      const finalPayload = { ...data, ...payload };
      finalPayload.avatar =
        data?.avatar?.length === 0 ? preview.avatar : data.avatar[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      finalPayload.images =
        data.images?.length === 0 ? preview.images : data.images;
      for (let image of finalPayload.images) formData.append("images", image);

      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateProduct(formData, editProduct._id);
      // dispatch(showModal({ isShowModal: false, modalChildren: null }));
      console.log(response);
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Update product successfully!!",
        });
        setEditProduct(null);
        render();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Update product fail",
        });
      }
    }
  };

  const markdownDescription = useMemo(
    () => payload.description,
    [payload.description]
  );

  return (
    <div className="w-full h-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Update Products</span>
        <span
          onClick={() => {
            setEditProduct(null);
          }}
          className="my-10 px-4 py-2 rounded-md text-white bg-green-400 text-semibold text-sm cursor-pointer hover:bg-green-600"
        >
          Cancel
        </span>
      </h1>
      <div className="px-4 ">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="py-4 flex flex-col gap-11">
            <div className="my-2">
              <InputForm
                label="Name product"
                register={register}
                errors={errors}
                id="title"
                placeholder="Name of new product"
                validate={{ required: "Need fill this field" }}
              />
            </div>
            <div className="w-full my-6 flex gap-10">
              <InputForm
                label="Quantity"
                register={register}
                errors={errors}
                id="quantity"
                type="number"
                placeholder="Quantity of new product"
                style="flex-auto"
                validate={{ required: "Need fill this field" }}
              />
              <InputForm
                label="Price"
                register={register}
                errors={errors}
                id="price"
                type="number"
                placeholder="Price of new product"
                style="flex-auto"
                validate={{ required: "Need fill this field" }}
              />
            </div>
            <div className="w-full mt-8 mb-2 flex gap-10">
              <Select
                label="Brand"
                register={register}
                fullWidth={true}
                style="flex-auto"
                errors={errors}
                id="brand_id"
                options={brands?.map((el) => ({
                  value: el._id,
                  text: el.title,
                }))}
                validate={{ required: "Need fill this field" }}
              />
              <Select
                label="Category"
                register={register}
                fullWidth={true}
                style="flex-auto"
                errors={errors}
                id="category_id"
                options={categories?.map((el) => ({
                  value: el._id,
                  text: el.title,
                }))}
                validate={{ required: "Need fill this field" }}
              />
            </div>
            <MarkdownEditor
              label="Desciption"
              name="description"
              value={markdownDescription}
              changeValue={changeValue}
              invalidFilds={invalidFilds}
              setInvalidFilds={setInvalidFilds}
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-semibold" htmlFor="">
              Upload Avatar
            </span>
            <div className="flex flex-col gap-2">
              <label
                className="h-[105px] cursor-pointer w-full border-2 border-dashed border-gray-400 flex items-center justify-center"
                htmlFor="avatar"
              >
                <BiImageAdd size={30} />
                <span>Choose file</span>
              </label>
              <input hidden type="file" id="avatar" {...register("avatar")} />
              {errors["avatar"] && (
                <small className="text-xs text-red-500">
                  {errors["avatar"]?.message}
                </small>
              )}
            </div>
            {preview.avatar && (
              <div className="flex items-center justify-center">
                <img
                  src={preview.avatar}
                  alt="avatarnail"
                  className="w-[200px] object-contain"
                />
              </div>
            )}
            <span className="font-semibold" htmlFor="">
              Upload Images
            </span>
            <div className="flex flex-col gap-2">
              <label
                className="h-[234px] flex-col cursor-pointer w-full border-2 border-dashed border-gray-400 flex items-center justify-center"
                htmlFor="images"
              >
                <FcAddImage size={50} />
                Upload images
              </label>
              <input
                hidden
                type="file"
                id="images"
                {...register("images")}
                multiple
              />
              {errors["images"] && (
                <small className="text-xs text-red-500">
                  {errors["images"]?.message}
                </small>
              )}
            </div>
            {preview.images.length > 0 && (
              <div className=" grid grid-cols-6 gap-2">
                {preview.images?.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item}
                      alt="imagesnail"
                      className="w-[200px] h-[200px] object-contain  border border-gray-400"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            style={
              "my-10 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700 text-semibold w-full"
            }
          >
            Update product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
