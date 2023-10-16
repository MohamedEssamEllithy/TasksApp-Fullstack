import React from "react";
import styles from "./GuardInverse.module.css";
import { Navigate } from "react-router-dom";

export default function GuardInverse(props) {
  if (localStorage.getItem("token")) return <Navigate to={"/profile"} />;
  else return <> {props.children}</>;
}
