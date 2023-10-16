import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import User from "../../Contexts/User";
import Token from "../../Contexts/Token";

export default function Layout() {
  return (
    <>
      <Token>
        <User>
          <Navbar></Navbar>
          <div className={`${styles.meContainer}`}>
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </User>
      </Token>
    </>
  );
}
