import React, { useState, useEffect, memo } from "react";
import ProductCard from "./ProductCard";
import { apiGetAllProducts } from "../../apis";
import Banner_1 from "../../assets/image/Banner_Featured_1.png";
import Banner_2 from "../../assets/image/Banner_Featured_2.png";
import Banner_3 from "../../assets/image/Banner_Featured_3.png";
import Banner_4 from "../../assets/image/Banner_Featured_4.png";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await apiGetAllProducts({ sort: "totalRatings" });
    if (response.data.products) {
      setProducts(response.data.products);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[20px] py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((product, index) => (
          <ProductCard
            key={index}
            avatar={product.avatar}
            title={product.title}
            totalRatings={product.totalRatings}
            price={product.price}
            productData={product}
          />
        ))}
      </div>
      <div className="flex h-[600px]">
        <div className="hovertitle w-[49%]">
          <img
            src={Banner_1}
            alt="Products"
            className="saller w-full h-[600px]"
          />
          <div className="overlay1"></div>
          <div className="overlay2"></div>
        </div>
        <div className="flex flex-col mx-4">
          <div className=" hovertitle">
            <img
              src={Banner_2}
              alt="Products"
              className="w-[290px] h-[290px] saller"
            />
            <div className="overlay1"></div>
            <div className="overlay2"></div>
          </div>
          <div className="mt-[20px]">
            <div className=" hovertitle">
              <img
                src={Banner_3}
                alt="Products"
                className=" w-[290px] h-[290px] saller"
              />
              <div className="overlay1"></div>
              <div className="overlay2"></div>
            </div>
          </div>
        </div>
        <div className="hovertitle">
          <img
            src={Banner_4}
            alt="Products"
            className="w-[320px] h-[600px] saller"
          />
          <div className="overlay1"></div>
          <div className="overlay2"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(FeatureProducts);

{
  /* <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
<img
  src={Banner_1}
  alt="Products"
  className="w-full h-full object-cover col-span-2 row-span-2"
/>
<img
  src={Banner_2}
  alt="Products"
  className="w-full h-full object-cover col-span-1 row-span-1"
/>
<img
  src={Banner_3}
  alt="Products"
  className="w-full h-full object-cover col-span-1 row-span-2"
/>
<img
  src={Banner_4}
  alt="Products"
  className="w-full h-full object-cover col-span-1 row-span-1 "
/>
</div> */
}
