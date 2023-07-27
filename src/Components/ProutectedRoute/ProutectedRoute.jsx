import React from "react";
import styles from "./ProutectedRoute.module.css";
import { Navigate } from "react-router-dom";

export default function ProutectedRoute(props) {
  if (localStorage.getItem("userToken") == null) {
    return <Navigate to={"/Login"} />;
  } else {
    return props.children;
  }
}
