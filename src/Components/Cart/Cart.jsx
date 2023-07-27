import React, { useContext, useEffect, useState } from "react";

import styles from "./Cart.module.css";
import Navbar from "../Navbar/Navbar";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function Cart() {
  let { getLoggedUSerCart, removeItem, ubdateProudctCount, clearCart } =
    useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);
  async function getCart() {
    let response = await getLoggedUSerCart();

    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
    }
  }

  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    toast.success("proudct removed", { duration: 2000 });
  }
  async function cartClearData() {
    let response = await clearCart();
    if (response?.data?.message === "success") {
      setcartDetails(null);
      toast.success("Cart cleared", { duration: 2000 });
    } else {
      toast.error("Failed to clear cart", { duration: 2000 });
    }

    // setcartDetails(response?.data?.data);
    // toast.success("cart cleared", { duration: 2000 });
  }

  async function ubdateProudctQunt(productId, count) {
    let response = await ubdateProudctCount(productId, count);
    setcartDetails(response.data.data);
    toast.success("proudct count updated", { duration: 2000 });
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      {cartDetails !== null ? (
        <div className="bg-main-light p-4 my-4 ">
          <h3>shop cart:</h3>
          <h6 className="text-main">
            total cart price :{cartDetails?.totalCartPrice} EGP
          </h6>
          {cartDetails?.products?.map((product) => (
            <div
              key={product.product._id}
              className="row align-items-center border-bottom py-3 my-2"
            >
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt=""
                />
              </div>

              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-main">price: {product.price}</h6>
                  <button
                    onClick={() => deleteItem(product.product._id)}
                    className="btn m-0 p-0 "
                  >
                    <i className="fa-regular text-main fa-trash-can"></i> Remove
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      ubdateProudctQunt(product.product._id, product.count + 1)
                    }
                    className="btn border-main bt-sm"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      ubdateProudctQunt(product.product._id, product.count - 1)
                    }
                    className="btn border-main bt-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => cartClearData()}
            className="btn border-main text-main w-100"
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <h2>You Havenot Added any items</h2>
      )}
    </>
  );
}
