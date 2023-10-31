import React, { memo } from "react";
import Slider from "react-slick";
import { ItemProduct } from "../";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const SliderCustomer = ({ products, activeTab, normal }) => {
  return (
    <div>
      {products && (
        <Slider className="custome-slider" {...settings}>
          {products?.map((item, index) => (
            <ItemProduct
              key={index}
              pid={item._id}
              productData={item}
              isNew={activeTab === 1 ? false : true}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(SliderCustomer);
