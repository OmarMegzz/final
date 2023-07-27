import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "./Register.module.css";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messsageError, setmesssageError] = useState("");

  async function handleRegister(values) {
    setisloading(true);

    let response = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values)
      .catch((errr) => {
        console.log("errr", errr);
        setisloading(false);
        setmesssageError(`${errr.response.data.message}`);
      });

    if (response?.data.message === "success") {
      setisloading(false);
      navigate("/login");
    }
  }
  let validation = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name minlenght is 3")
      .max(10, "name maxlenght is 10"),
    email: yup.string().required("email is required").email("email is invalid"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with A a"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .oneOf([yup.ref("password")]),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone is not valid ...."),
  });
  // function validate(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "name is requires";
  //   } else if (values.name.length < 3) {
  //     errors.name = "name minlength is 3";
  //   } else if (values.name.length > 10) {
  //     errors.name = "name maxlength is 10";
  //   }
  //   if (!values.email) {
  //     errors.email = "email is requires";
  //   }
  //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = "email is invalid";
  //   }

  //   if (!values.password) {
  //     errors.password = "password is requires";
  //   }
  //   if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)) {
  //     errors.password = "password must have ....";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "rePassword is requires";
  //   }
  //   if (values.password !== values.rePassword) {
  //     errors.rePassword = "password and rePassword  does not match";
  //   }

  //   return errors;
  // }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validation,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register now:</h3>

        {messsageError.length > 0 ? (
          <div className="alert alert-danger">{messsageError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="phone">Phone :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}

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
          <label htmlFor="rePassword">rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
