import React, { memo, useEffect, useRef } from "react";
import Slider from "react-slick";
import banner_home from "../../assets/image/banner_home.png";
import banner_home1 from "../../assets/image/voucher_1.png";
import banner_home2 from "../../assets/image/voucher_2.png";
import banner_home3 from "../../assets/image/voucher_3.png";
import banner_home4 from "../../assets/image/voucher_4.png";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Banner = () => {
  const sliderRef = useRef(null);
  useEffect(() => {
    const slider = sliderRef.current;
    const interval = setInterval(() => {
      slider.slickNext();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="w-full">
      <Slider {...settings} ref={sliderRef}>
        <div>
          <img
            src={banner_home}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div>
          <img
            src={banner_home1}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
        </div>
        <div>
          <img
            src={banner_home2}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
        </div>
        <div>
          <img
            src={banner_home3}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
        </div>
        <div>
          <img
            src={banner_home4}
            alt="banner"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default memo(Banner);
