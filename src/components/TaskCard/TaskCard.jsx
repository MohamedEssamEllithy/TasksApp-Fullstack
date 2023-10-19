import React from "react";
import styles from "./TaskCard.module.css";
import img from "./images/avatar.png";

export default function TaskCard(props) {
  let {
    task: {
      assignTo,
      createdAt,
      deadline,
      description,
      status,
      title,
      updatedAt,
      userID,
    },
  } = props;

  return (
    <>
      <div className={`${styles.meCard}`}>
        <div
          className={`${status == "Doing" ? styles.meDoing : "d-none"}`}
        ></div>
        <div className={`${status == "Done" ? styles.meDone : "d-none"}`}>
          <i className="fa-solid fa-check" style={{ color: "#00ff00" }}></i>
        </div>
        <div className={`${status == "ToDo" ? styles.meToDo : "d-none"}`}>
          <div
            className="spinner-grow spinner-grow-sm text-warning"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>{" "}
        </div>
        <div className="d-flex justify-content-start align-items-center">
          <img src={img} alt="img" className={`${styles.meImg}`} />
          <div>
            <h4 className={`text-center ${styles.title}`}>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Status : <span className={` ${styles.title}`}>{status}</span>
          </div>
          <div>
            Due :{" "}
            <span className={` ${styles.title}`}>
              {new Date(deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-2">
          Created by :{" "}
          <span className={` ${styles.title}`}>{userID.userName}</span>
        </div>
        <div className="mt-2">
          Assigned to : <span className={` ${styles.title}`}>{assignTo}</span>
        </div>
      </div>
    </>
  );
}
