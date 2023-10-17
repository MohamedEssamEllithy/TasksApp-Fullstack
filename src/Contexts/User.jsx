import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "./Token";

export const userContext = createContext();
export default function User(props) {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setErrorr] = useState("");
  let [success, setSucess] = useState("");
  let navigate = useNavigate();
  let token = useContext(tokenContext);
  function registerFn(values) {
    setIsLoading(true);
    axios
      .post("https://task-app-nkax.onrender.com/user/signup", {
        ...values,
      })
      .then((res) => {
        setIsLoading(false);
        setSucess(res.data.Message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.data.Message.writeErrors)
          setErrorr(err.response.data.Message.writeErrors[0].err.errmsg);
        else if (err.response.data.Message == "User is already signed up")
          setErrorr(err.response.data.Message);
      });
  }
  function loginFn(values) {
    setIsLoading(true);
    axios
      .post("https://task-app-nkax.onrender.com/user/login", {
        ...values,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsLoading(false);
        token.setToken(res.data.token);
        navigate("/tasks");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.data.Message) setErrorr("Incorrect Email or password");
      });
  }
  function changePasswordFn(values) {
    setIsLoading(true);
    axios
      .patch(
        "https://task-app-nkax.onrender.com/user/updatePassword",
        {
          ...values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setSucess(res.data.Message);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorr(err.response.data.Message);
      });
  }
  function updateInfoFn(values) {
    setIsLoading(true);
    axios
      .patch(
        "https://task-app-nkax.onrender.com/user/updateInfo",
        {
          ...values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        setSucess(res.data.Message);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorr(err.response.data.Message);
      });
  }
  function deleteFn() {
    setIsLoading(true);
    axios
      .delete("https://task-app-nkax.onrender.com/user/delete", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSucess(res.data.Message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        // localStorage.removeItem("token"); Gives error
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorr(err.response.data.Message);
      });
  }
  return (
    <>
      <userContext.Provider
        value={{
          registerFn,
          isLoading,
          setIsLoading,
          error,
          setErrorr,
          success,
          setSucess,
          loginFn,
          changePasswordFn,
          updateInfoFn,
          deleteFn,
        }}
      >
        {props.children}
      </userContext.Provider>
    </>
  );
}
