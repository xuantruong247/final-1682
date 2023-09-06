import React, { memo, useEffect, useState } from "react";
import { apiGetAllProducts } from "../../apis";
import Slider from "react-slick";
import ItemProduct from "./ItemProduct";
import sale_1 from "../../assets/image/sale-1.png";
import sale_2 from "../../assets/image/sale-2.png";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProduct, setNewProduct] = useState([null]);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);

  const getAllProducts = async () => {
    const response = await Promise.all([
      apiGetAllProducts({ sort: "-sold" }),
      apiGetAllProducts({ sort: "-craetedAt" }),
    ]);
    if (response[0]?.data?.products) {
      setBestSeller(response[0].data?.products);
      setProducts(response[0].data?.products);
    }
    if (response[1]?.data?.products) {
      setNewProduct(response[1].data?.products);
      setProducts(response[1].data?.products);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSeller);
    if (activeTab === 2) setProducts(newProduct);
  }, [activeTab]);

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((item, index) => (
          <span
            key={index}
            className={`font-semibold uppercase text-gray-400 cursor-pointer ${
              activeTab === item.id ? "text-red-950  " : ""
            }`}
            onClick={() => {
              setActiveTab(item.id);
            }}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-8px] h-[400px]">
        <Slider {...settings}>
          {products?.map((product, index) => (
            <ItemProduct
              key={index}
              pid={product.id}
              productData={product}
              isNew={activeTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className="flex gap-4 mt-6 w-full">
        <div className="hovertitle w-[49%]">
          <img src={sale_1} alt="banner" className="saller" />
          <div className="overlay1"></div>
          <div className="overlay2"></div>
        </div>
        <div className="hovertitle w-[49%]">
          <img src={sale_2} alt="banner" className="saller" />
          <div className="overlay1"></div>
          <div className="overlay2"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(BestSeller);
