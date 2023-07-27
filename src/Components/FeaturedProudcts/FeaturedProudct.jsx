import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProudcts.module.css";
import axios from "axios";
import Proudctdetails from "../Proudctdetails/Proudctdetails";
import proudcts from "../Proudcts/Proudcts";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

function FeaturedProudcts() {
  const [products, setproducts] = useState([]);
  let { addToCart } = useContext(CartContext);

  async function addProudct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      toast.success(response.data.message, { duration: 2000 });
    } else {
      toast.error("Error", { duration: 2000 });
    }
  }

  async function getProudcts() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setproducts(data.data);
  }
  useEffect(() => {
    getProudcts();
  }, []);

  return (
    <>
      <div className="row mt-5">
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="product cursor-pointer px-2 py-4 col-md-2"
            >
              <Link to="Proudctdetails" state={{ productId: product._id }}>
                <div>
                  <img className="w-100" src={product.imageCover} alt="" />

                  <span className="text-main fw-bold font-sm">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => {
                  addProudct(product._id);
                }}
                className="btn product bg-main text-white w-100 mt-3"
              >
                + add
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default FeaturedProudcts;
