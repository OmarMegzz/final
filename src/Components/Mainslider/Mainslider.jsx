import React from "react";
import styles from "./Mainslider.module.css";
import Slider from "react-slick";

function Mainslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="mb-5">
        <Slider {...settings}>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/grocery-banner-2.jpeg")}
              alt=""
            />
          </div>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/grocery-banner.png")}
              alt=""
            />
          </div>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/slider-2.jpeg")}
              alt=""
            />
          </div>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/slider-image-1.jpeg")}
              alt=""
            />
          </div>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/slider-image-2.jpeg")}
              alt=""
            />
          </div>
          <div>
            <img
              height={500}
              className="w-100"
              src={require("../../images/slider-image-3.jpeg")}
              alt=""
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
export default Mainslider;
