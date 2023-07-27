import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "./Login.module.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messsageError, setmesssageError] = useState("");

  async function handleLogin(values) {
    setisloading(true);

    let response = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((errr) => {
        setisloading(false);
        setmesssageError(`${errr.response.data.message}`);
      });

    if (response?.data.message === "success") {
      localStorage.setItem("userToken", response?.data.token);
      saveUserData();
      setisloading(false);
      navigate("/");
    }
  }
  let validation = yup.object({
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with A a"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Login now:</h3>

        {messsageError.length > 0 ? (
          <div className="alert alert-danger">{messsageError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {isloading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
