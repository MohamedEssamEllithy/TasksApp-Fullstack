import React, { useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import { NavLink, Link, Navigate } from "react-router-dom";
import { tokenContext } from "../../Contexts/Token";

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);

  useEffect(() => {}, [token]);
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("google");
    setToken(null);
  }
  return (
    <>
      <nav className={`${styles.meNav} navbar navbar-expand-lg `}>
        <div className="container">
          <Link className="navbar-brand text-light" to={"/login"}>
            Website Logo
          </Link>
          <button
            className="navbar-toggler border border-light text-bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item ${token ? "d-none" : "d-inline"}`}>
                <NavLink className="nav-link text-light " to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li className={`nav-item ${token ? "d-none" : "d-inline"}`}>
                <NavLink className="nav-link text-light" to={"/register"}>
                  Register
                </NavLink>
              </li>
              <li className={`nav-item ${token ? "d-inline" : "d-none"}`}>
                <NavLink className="nav-link text-light" to={"/tasks"}>
                  Tasks
                </NavLink>
              </li>
              <li className={`nav-item ${token ? "d-inline" : "d-none"}`}>
                <NavLink className="nav-link text-light" to={"/profile"}>
                  Profile
                </NavLink>
              </li>
              <li className={`nav-item ${token ? "d-inline" : "d-none"}`}>
                <NavLink
                  className="nav-link text-light"
                  onClick={logout}
                  to={"/"}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
