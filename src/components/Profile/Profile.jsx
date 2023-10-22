import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { tokenContext } from "../../Contexts/Token";
import jwt_decode from "jwt-decode";
import profileImage from "./images/avatar.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userContext } from "../../Contexts/User";
import StaticExample from "../Modal/Modal";

export default function Profile() {
  // let { token } = useContext(tokenContext); //Gives error
  let token = localStorage.getItem("token");
  let decoded = jwt_decode(token);
  let [userName, setUserName] = useState();
  let [Email, setEmail] = useState();

  let [show, setShow] = useState(false);
  let [show2, setShow2] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let userModule = useContext(userContext);
  useEffect(() => {
    userModule.setIsLoading(false);
    userModule.setSucess("");
    userModule.setErrorr("");
    if (localStorage.getItem("google")) {
      setUserName(decoded.name);
      setEmail(decoded.email);
    } else {
      setUserName(decoded.payload?.userName);
      setEmail(decoded.payload?.Email);
    }
  }, []);
  let validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password format"
      )
      .required("This field is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid Password format"
      )
      .required("This field is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords did not match")
      .required("This field is required"),
  });
  let validationSchema2 = Yup.object({
    userName: Yup.string()
      .max(25, "UserName should be 25 character at max")
      .min(3, "UserName should be 3 character at min")
      .required("This field is required"),
    age: Yup.number()
      .max(75, "Your age must be less that 75")
      .min(12, "Your age must be more tha 12")
      .required("This field is required"),
  });
  let form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      userModule.setIsLoading(false);
      userModule.setSucess("");
      userModule.setErrorr("");
      userModule.changePasswordFn(values);
    },
  });
  let form2 = useFormik({
    initialValues: {
      userName: "",
      age: "",
    },
    validationSchema: validationSchema2,

    onSubmit: (values) => {
      userModule.setIsLoading(false);
      userModule.setSucess("");
      userModule.setErrorr("");
      userModule.updateInfoFn(values);
    },
  });
  function changePassword() {
    setShow(!show);
    userModule.setIsLoading(false);
    userModule.setSucess("");
    userModule.setErrorr("");
  }
  function updateInfo() {
    setShow2(!show2);
    userModule.setIsLoading(false);
    userModule.setSucess("");
    userModule.setErrorr("");
  }
  async function deleteAcc() {
    userModule.setIsLoading(false);
    userModule.setSucess("");
    userModule.setErrorr("");
    await userModule.deleteFn();
  }
  return (
    <>
      <div className={`${showModal ? styles.meScroll : null}`}></div>
      <div className={`${styles.meContainer}`}>
        <img
          src={profileImage}
          alt="Profile image"
          className={`${styles.meImg}`}
        />
        <div>
          <div className="mt-3 ">
            <span className={`${styles.meTitle}`}>Username : </span>
            <span className="text-light">{userName}</span>
          </div>
          <div>
            <span className={`${styles.meTitle}`}>Email: </span>
            <span className="text-light">{Email}</span>
          </div>
        </div>
        {localStorage.getItem("google") ? null : (
          <>
            <div>
              <form
                className={`${show ? styles.meShow : "d-none"} mt-3`}
                onSubmit={form.handleSubmit}
              >
                <div className="form-group mb-2 d-flex align-items-center flex-wrap">
                  <label htmlFor="password" className={`text-white me-2 `}>
                    Current Password:
                  </label>
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
                    placeholder="Enter your current password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errors.password && form.touched.password ? (
                    <p className={`${styles.meAlert}`}>
                      {form.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group mb-2 d-flex align-items-center flex-wrap">
                  <label htmlFor="newPassword" className={`text-white me-2 `}>
                    New Password:
                  </label>
                  <input
                    className={`${styles.meInput} ${
                      form.touched.newPassword
                        ? form.errors.newPassword
                          ? styles.meFail
                          : styles.meSuccess
                        : ""
                    }`}
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    value={form.values.newPassword}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errors.newPassword && form.touched.newPassword ? (
                    <p className={`${styles.meAlert}`}>
                      {form.errors.newPassword}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group mb-2 d-flex align-items-center flex-wrap">
                  <label htmlFor="rePassword" className={`text-white me-2 `}>
                    Repeat Password:
                  </label>
                  <input
                    className={`${styles.meInput} ${
                      form.touched.rePassword
                        ? form.errors.rePassword
                          ? styles.meFail
                          : styles.meSuccess
                        : ""
                    }`}
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    placeholder="Repeat your Password"
                    value={form.values.rePassword}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                  {form.errors.rePassword && form.touched.rePassword ? (
                    <p className={`${styles.meAlert}`}>
                      {form.errors.rePassword}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={`${
                    userModule.error ? "text-danger" : "text-success"
                  } text-center`}
                >
                  {userModule.error
                    ? userModule.error
                    : userModule.success
                    ? userModule.success
                    : ""}
                </div>
                <button
                  type="submit"
                  className={`btn btn-outline-success rounded-pill d-block mx-auto mt-3`}
                >
                  {userModule.isLoading ? (
                    <i className="fa fa-spin fa-spinner"></i>
                  ) : (
                    "Comfirm"
                  )}
                </button>
              </form>
              <form
                className={`${show2 ? styles.meShow : "d-none"} mt-3`}
                onSubmit={form2.handleSubmit}
              >
                <div className="form-group mb-2 d-flex align-items-center flex-wrap">
                  <label htmlFor="userName" className={`text-white me-2 `}>
                    New Username:
                  </label>
                  <input
                    className={`${styles.meInput} ${
                      form2.touched.userName
                        ? form2.errors.userName
                          ? styles.meFail
                          : styles.meSuccess
                        : ""
                    }`}
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="Enter new username"
                    value={form2.values.userName}
                    onChange={form2.handleChange}
                    onBlur={form2.handleBlur}
                  />
                  {form2.errors.userName && form2.touched.userName ? (
                    <p className={`${styles.meAlert}`}>
                      {form2.errors.userName}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group mb-2 d-flex align-items-center flex-wrap">
                  <label htmlFor="age" className={`text-white me-2 `}>
                    Age:
                  </label>
                  <input
                    className={`${styles.meInput} ${
                      form2.touched.age
                        ? form2.errors.age
                          ? styles.meFail
                          : styles.meSuccess
                        : ""
                    }`}
                    type="text"
                    id="age"
                    name="age"
                    placeholder="Enter your Age"
                    value={form2.values.age}
                    onChange={form2.handleChange}
                    onBlur={form2.handleBlur}
                  />
                  {form2.errors.age && form2.touched.age ? (
                    <p className={`${styles.meAlert}`}>{form2.errors.age}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div
                  className={`${
                    userModule.error ? "text-danger" : "text-success"
                  } text-center`}
                >
                  {userModule.error
                    ? userModule.error
                    : userModule.success
                    ? userModule.success
                    : ""}
                </div>
                <button
                  type="submit"
                  className={`btn btn-outline-success rounded-pill d-block mx-auto mt-3`}
                >
                  {userModule.isLoading ? (
                    <i className="fa fa-spin fa-spinner"></i>
                  ) : (
                    "Comfirm"
                  )}
                </button>
              </form>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className={`${styles.meBtn} ${
                  show2 ? "d-none" : styles.meShow
                } `}
                onClick={changePassword}
              >
                {show ? "Back" : "Change Password"}
              </button>
              <button
                className={`${styles.meBtn} ${show ? "d-none" : styles.meShow}`}
                onClick={updateInfo}
              >
                {show2 ? "Back" : "Update Info"}
              </button>
              <button
                type="button"
                className={`btn btn-outline-danger rounded-pill ${
                  show ? "d-none" : show2 ? "d-none" : styles.meShow
                }`}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>

      {showModal ? (
        <StaticExample
          setShowModal={setShowModal}
          deleteAcc={deleteAcc}
          isLoading={userModule.isLoading}
          success={userModule.success}
          error={userModule.error}
        />
      ) : (
        ""
      )}
    </>
  );
}
