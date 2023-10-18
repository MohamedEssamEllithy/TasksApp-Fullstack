import React from "react";
import styles from "./TaskCard.module.css";
import img from "./images/avatar.png";

export default function TaskCard(props) {
  console.log(props);
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
          Assigned to :{" "}
          <span className={` ${styles.title}`}>{assignTo?.userName}</span>
        </div>
      </div>
    </>
  );
}
