import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToCart(x) {
    try {
      const response = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        { productId: x },
        { headers: headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async function getLoggedUSerCart(x) {
    try {
      const response = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/cart`,

        { headers: headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
  async function removeItem(productId) {
    try {
      const response = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        { headers: headers }
      );

      return response;
    } catch (error) {
      return error;
    }
  }

  async function clearCart() {
    try {
      const response = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart`,

        { headers: headers }
      );
      console.log("clear cart", response);
      return response;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async function ubdateProudctCount(productId, count) {
    try {
      const response = await axios.put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          count: count,
        },

        { headers: headers }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUSerCart,
        removeItem,
        ubdateProudctCount,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
