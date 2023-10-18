import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import User from "../../Contexts/User";
import Token from "../../Contexts/Token";
import { Provider } from "react-redux";
import Store from "../../Redux/Store";

export default function Layout() {
  return (
    <>
      <Provider store={Store}>
        <Token>
          <User>
            <Navbar></Navbar>
            <div className={`${styles.meContainer}`}>
              <Outlet></Outlet>
            </div>
            <Footer></Footer>
          </User>
        </Token>
      </Provider>
    </>
  );
}
