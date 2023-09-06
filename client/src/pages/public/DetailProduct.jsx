import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetAllProducts } from "../../apis";
import Slider from "react-slick";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
import DOMPurify from "dompurify";
import {
  Button,
  SelectQuantity,
  ProductExtrainfo,
  ProductInformation,
  SliderCustomer,
} from "../../components";
import { ProductExtraInformation } from "../../utils/contants";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const { pid, title } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response?.data?.productData) {
      setProduct(response?.data?.productData);
      setCurrentImage(response?.data?.productData?.avatar);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetAllProducts();
    if (response?.data?.products) {
      setRelatedProducts(response?.data?.products);
    }
    console.log(response?.data?.products);
  };

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
  }, [update]);

  const rerender = useCallback(() => {
    setUpdate(!update);
  });

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 0) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const handleClickImages = (item) => {
    setCurrentImage(item);
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium uppercase">{title}</h3>
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className=" w-2/5 flex flex-col gap-4">
          <img
            src={currentImage}
            alt="product"
            className="h-[458px] w-[458px] border object-cover mx-2"
          />
          <div className="w-[458px]">
            <Slider {...settings}>
              {product?.images?.map((item, index) => (
                <div key={index} className="px-2">
                  <img
                    onClick={(e) => handleClickImages(item)}
                    src={item}
                    alt="sub-product"
                    className="h-[143px] w-[143px] border object-cover cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4 mr-4">
          <h2 className="text-[30px] font-semibold">{`${formatMoney(
            product?.price
          )} VNĐ`}</h2>
          <div className="flex items-center gap-2">
            <span className="flex  gap-1">
              {renderStarFromNumber(product?.totalRatings)?.map(
                (item, index) => (
                  <p key={index}>{item}</p>
                )
              )}
            </span>
            <span className="text-[12px]  text-main italic">
              ({product?.sold} Sold)
            </span>
          </div>
          <ul className=" list-square text-[14px] text-gray-500 pl-4">
            {product?.description?.length > 1 &&
              product?.description?.map((item, index) => (
                <li className=" leading-6" key={index}>
                  {item}
                </li>
              ))}
            {/* {product?.description?.map((item, index) => (
                <li className=" leading-6" key={index}>
                  {item}
                </li>
              ))} */}
            {product?.description?.length === 1 && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button>ADD TO CART</Button>
          </div>
        </div>
        <div className=" w-1/5">
          {ProductExtraInformation.map((item, index) => (
            <ProductExtrainfo
              icon={item.icon}
              title={item.title}
              sub={item.sub}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInformation
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto   mt-8">
        <h3 className="font-semibold text-[20px] py-[15px] border-b-2 border-main mb-4">
          OTHER CUSTOMER ALSO LIKED
        </h3>
        <SliderCustomer products={relatedProducts} normal={true} />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default DetailProduct;
