import React, { useContext, useEffect, useState } from "react";
import styles from "./TaskCard.module.css";
import img from "./images/avatar.png";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../Redux/DeleteTaskSlice";
import { tokenContext } from "../../Contexts/Token";
import AddForm from "../AddForm/AddForm";
import UpdateForm from "../UpdateForm/UpdateForm";



export default function TaskCard(props) {
  let urlimg =
    "https://trello-members.s3.amazonaws.com/62b965c65b45257415e1c810/885bce69516a6b2c76ca54247530a90f/30.png";
  let [updateTask, setUpdateTask] = useState(false);
  let [addTask, setAddTask] = useState(false);
  let [showcard, setShowcard] = useState(false);
  let [email, setEmail] = useState();
  let dispatch = useDispatch();
  let decoded = jwtDecode(localStorage.getItem("token"));


  useEffect(() => {
    if (localStorage.getItem("google")) {
      setEmail(decoded.email);
    } else {
      let {
        payload: { Email },
      } = decoded;
      setEmail(Email);
    }
  }, []);

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
      _id,
    },
  } = props;

  return (
    <>
      <div
        className={`${styles.meCard} text-primary-emphasis`}
        onClick={() => setShowcard(!showcard)}
      >
        <div
          className={`${status === "Doing" ? styles.meDoing : "d-none"}`}
        ></div>
        <div className={`${status === "Done" ? styles.meDone : "d-none"}`}>
          <i className="fa-solid fa-check" style={{ color: "#00ff00" }}></i>
        </div>
        <div className={`${status === "ToDo" ? styles.meToDo : "d-none"}`}>
          <div
            className="spinner-grow spinner-grow-sm text-warning"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>{" "}
        </div>
        <div className="d-flex justify-content-start align-items-center">
          <div>
            <h4 className={`text-start mb-0 ${styles.title}`}>{title}</h4>
            <p className="fs-6 fw-lighter">by: {userID.userName}</p>
          </div>
        </div>
        {showcard && (
          <div className={` rounded-4 p-2 ${styles.decrib}`}>
            <div className="d-flex justify-content-start my-2">
              <p>{description}</p>
            </div>
            <hr />
            <div className="row mb-4">
              <div className="col-6">
                Assigned to :{" "}
                <div className={` ${styles.title}`}>
                  <a href={`mailto:${assignTo}`}>
                    <img
                      src={urlimg}
                      alt="img"
                      className={`${styles.meImg}`}
                      title={assignTo}
                    />
                  </a>
                </div>
              </div>
              <div className="col-6">
                Status : <span className={` ${styles.title}`}>{status}</span>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between mt-2">
          <div>
            Due :{" "}
            <span className={` ${styles.title}`}>
              {new Date(deadline).toLocaleDateString()}
            </span>
          </div>
          {userID.Email === email && (
            <div>
              <button
                className={`${styles.meDelete}`}
                onClick={() => setUpdateTask(true)}
              >
                <i
                  className="fa-solid fa-wrench"
                  style={{ color: "#00ff00" }}
                ></i>
              </button>
              <button
                className={`${styles.meDelete}`}
                onClick={() => {
                  dispatch(deleteTask(_id)).then(() => props.handleRefresh());
                }}
              >
                <i
                  className="fa-solid fa-trash"
                  style={{ color: "#ff0000" }}
                ></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {updateTask ? (
        <UpdateForm
          setUpdateTask={setUpdateTask}
          task={props.task}
          handleRefresh={props.handleRefresh()}
        />
      ) : null}
    </>
  );
}
