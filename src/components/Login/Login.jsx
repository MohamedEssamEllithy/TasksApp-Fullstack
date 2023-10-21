import React, { useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userContext } from "../../Contexts/User";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Contexts/Token";

export default function Login() {
  let userModule = useContext(userContext);
  let navigate = useNavigate();
  let token = useContext(tokenContext);

  function handleCallbackRes(res) {
    localStorage.setItem("token", res.credential);
    token.setToken(res.credential);
    navigate("/tasks");
  }
  useEffect(() => {
    /*global google*/
    userModule.setIsLoading(false);
    userModule.setSucess("");
    userModule.setErrorr("");
    google.accounts.id.initialize({
      client_id:
        "867749938848-mp8jl817fmrccj1dqrk9keptcn15buvq.apps.googleusercontent.com",
      callback: handleCallbackRes,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
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
      userModule.loginFn(values);
    },
  });

  return (
    <div className={`${styles.meContainer}`}>
      <h1 className="text-white text-center">Login</h1>
      <div className={`${userModule.error ? "text-danger " : ""} text-center`}>
        {userModule.error ? userModule.error : ""}
      </div>
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
          {userModule.isLoading ? (
            <i className="fa fa-spin fa-spinner"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div id="signInDiv" className="d-flex justify-content-center"></div>
    </div>
  );
}
