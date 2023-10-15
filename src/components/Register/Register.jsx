import React from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  let validationSchema = Yup.object({
    userName: Yup.string()
      .max(25, "UserName should be 25 character at max")
      .min(3, "UserName should be 3 character at min")
      .required("This field is required"),
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
    age: Yup.number()
      .max(75, "Your age must be less that 75")
      .min(12, "Your age must be more tha 12")
      .required("This field is required"),
    gender: Yup.string()
      .required()
      .oneOf(["male", "female"], "This field is required"),
    phone: Yup.string().matches(/01(0|1|2|5)[0-9]{8}/, "Invalid Phone format"),
  });
  let form = useFormik({
    initialValues: {
      userName: "",
      Email: "",
      password: "",
      age: "",
      gender: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={`${styles.meContainer}`}>
      <h1 className="text-white text-center">Register</h1>
      <form onSubmit={form.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="userName" className="text-white">
            Username:
          </label>
          <br />
          <input
            className={`${styles.meInput} ${
              form.touched.userName
                ? form.errors.userName
                  ? styles.meFail
                  : styles.meSuccess
                : ""
            }`}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter username of your choice"
            value={form.values.userName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.userName && form.touched.userName ? (
            <p className={`${styles.meAlert}`}>{form.errors.userName}</p>
          ) : (
            ""
          )}
        </div>
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
        <div className="form-group mb-3">
          <label htmlFor="age" className="text-white">
            Age:
          </label>
          <br />
          <input
            className={`${styles.meInput} ${
              form.touched.age
                ? form.errors.age
                  ? styles.meFail
                  : styles.meSuccess
                : ""
            }`}
            type="number"
            id="age"
            name="age"
            placeholder="Enter your Age"
            value={form.values.age}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.age && form.touched.age ? (
            <p className={`${styles.meAlert}`}>{form.errors.age}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-3">
          <label className="text-white">Gender:</label>
          <input
            type="radio"
            name="gender"
            id="male"
            value="male"
            className="ms-3"
            onChange={form.getFieldProps("gender").onChange}
            onBlur={form.handleBlur}
          />
          <label htmlFor="male" className="text-white">
            Male
          </label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            className="ms-3"
            onChange={form.getFieldProps("gender").onChange}
            onBlur={form.handleBlur}
          />
          <label htmlFor="female" className="text-white">
            Female
          </label>
          {form.errors.gender && form.touched.gender ? (
            <p className={`${styles.meAlert}`}>{form.errors.gender}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-5">
          <label htmlFor="phone" className="text-white">
            Phone:
          </label>
          <br />
          <input
            className={`${styles.meInput} ${
              form.touched.phone
                ? form.errors.phone
                  ? styles.meFail
                  : styles.meSuccess
                : ""
            }`}
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your Phone"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.phone && form.touched.phone ? (
            <p className={`${styles.meAlert}`}>{form.errors.phone}</p>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className={`${styles.meBtn} mb-5`}>
          Register
        </button>
      </form>
    </div>
  );
}
