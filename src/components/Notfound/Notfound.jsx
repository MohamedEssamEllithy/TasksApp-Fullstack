import React from "react";
import styles from "./Notfound.module.css";

export default function Notfound() {
  return (
    <div className={`${styles.meContainer} text-center`}>
      {" "}
      <div>
        <i
          className="fa-regular fa-face-sad-tear fa-10x"
          style={{ color: "#cacaca" }}
        ></i>
      </div>
      <div className="description mt-3 text-white text-center">
        <h1>404 : The page you requested is not found</h1>
        <h3 className="text-center">Would you like to browse back?!</h3>
      </div>
    </div>
  );
}
