import React from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  let validationSchema = Yup.object({
    Email: Yup.string()
      .matches(
        /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/,
        "Invalid Email format"
      )
      .required("This field is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password format"
      )
      .required("This field is required"),
  });
  let form = useFormik({
    initialValues: {
      Email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`${styles.meContainer}`}>
      <h1 className="text-white text-center">Login</h1>
      <form onSubmit={form.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <br />
          <input
            className={`${styles.meInput} ${
              form.touched.Email
                ? form.errors.Email
                  ? styles.meFail
                  : styles.meSuccess
                : ""
            }`}
            type="text"
            id="email"
            name="Email"
            placeholder="Enter your Email"
            value={form.values.Email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.Email && form.touched.Email ? (
            <p className={`${styles.meAlert}`}>{form.errors.Email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <br />
          <input
            className={`${styles.meInput} ${
              form.touched.password
                ? form.errors.password
                  ? styles.meFail
                  : styles.meSuccess
                : ""
            }`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.password && form.touched.password ? (
            <p className={`${styles.meAlert}`}>{form.errors.password}</p>
          ) : (
            ""
          )}
        </div>

        <button type="submit" className={`${styles.meBtn} mb-5`}>
          Login
        </button>
      </form>
    </div>
  );
}
