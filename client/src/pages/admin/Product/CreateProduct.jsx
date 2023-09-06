import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  InputForm,
  Select,
  MarkdownEditor,
  Loading,
} from "../../../components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "../../../utils/helpers";
import Swal from "sweetalert2";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiImageAdd } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { apiCreateProduct } from "../../../apis";
import { showModal } from "../../../redux/category/categorySlide";

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm({});

  const dispatch = useDispatch();

  const [hoverElm, setHoverElm] = useState(null);
  const [payload, setPayload] = useState({
    description: "",
  });

  const [preview, setPreview] = useState({
    avatar: null,
    images: [],
  });

  const handlePreviewAvt = async (file) => {
    const base64Avt = await getBase64(file);
    setPreview((prev) => ({ ...prev, avatar: base64Avt }));
  };

  useEffect(() => {
    handlePreviewAvt(watch("avatar")[0]);
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
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const [invalidFilds, setInvalidFilds] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const { categories } = useSelector((state) => state.category);

  const { brands } = useSelector((state) => state.brand);


  const handleCreateProduct = async (data) => {
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
      // console.log(finalPayload);
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.avatar) {
        formData.append("avatar", finalPayload.avatar[0]);
      }
      if (finalPayload.images) {
        for (let image of finalPayload.images) {
          formData.append("images", image);
        }
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateProduct(formData);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response) {
        Swal.fire({
          icon: "success",
          text: "Create product successfully!!",
        });
        setPayload({
          avatar: "",
          images: [],
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: "Create product fail",
        });
      }

      console.log(response.data.createdProduct);
    }
  };

  const handleRemoveImg = (name) => {
    if (preview.images?.some((el) => el.name === name)) {
      setPreview((prev) => ({
        ...prev,
        images: preview.images?.filter((el) => el.name !== name),
      }));
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[60px] flex justify-between items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Create New Product</span>
      </h1>
      <div className="px-4 ">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
              value=""
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
              <input
                hidden
                type="file"
                id="avatar"
                {...register("avatar", { required: "Need fill " })}
              />
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
                {...register("images", { required: "Need fill " })}
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
                  <div
                    onMouseEnter={() => {
                      setHoverElm(item.name);
                    }}
                    key={index}
                    className="w-fit relative"
                    onMouseLeave={() => {
                      setHoverElm(null);
                    }}
                  >
                    <img
                      src={item.path}
                      alt="avatarnail"
                      className="w-[200px] h-[200px] object-contain  border border-gray-400"
                    />
                    {hoverElm === item.name && (
                      <div
                        onClick={() => {
                          handleRemoveImg(item.name);
                        }}
                        className="absolute top-1 right-0 flex items-center justify-center cursor-pointer text-main p-2 rounded-full bg-overlay"
                      >
                        <RiDeleteBin2Fill size={30} color="" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            style={
              "my-10 px-4 py-2 rounded-md text-white bg-main text-semibold w-full"
            }
          >
            Create new product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
