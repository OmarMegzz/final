import React, { useEffect, useState } from "react";
import styles from "./Proudctdetails.module.css";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import Slider from "react-slick";

export default function Proudctdetails() {
  const { state } = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const [ProudctDetails, setProudctDetails] = useState(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProudctDetails() {
    setisLoading(true);
    try {
      let { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${state.productId}`
      );
      setisLoading(false);

      setProudctDetails(data.data);
    } catch (error) {
      console.log("get product details function error:", error);
    }
  }

  useEffect(function () {
    getProudctDetails();
  }, []);

  return (
    <>
      {ProudctDetails ? (
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 ">
              <Slider {...settings}>
                {ProudctDetails?.images.map((img) => (
                  <img src={img} />
                ))}
              </Slider>
            </div>
            <div className=" col-md-9">
              <h2>{ProudctDetails.title}</h2>
              <p>{ProudctDetails.description}</p>
              <div className="d-flex justify-content-between mt-5">
                <span>Price:{ProudctDetails.price} </span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {ProudctDetails.ratingsAverage}
                </span>
              </div>
              <button className="btn btn-success w-100 mt-3">
                add proudct to cart +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin fa-2x text-main"></i>
        </div>
      )}
    </>
  );
}
