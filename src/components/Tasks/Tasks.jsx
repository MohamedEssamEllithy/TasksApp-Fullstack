import React, { useEffect } from "react";
import styles from "./Tasks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../Redux/TasksSlice";
import TaskCard from "../TaskCard/TaskCard";

export default function Tasks() {
  let { tasksArr } = useSelector((state) => state.Tasks);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [tasksArr]);
  return (
    <>
      <div
        className={`${
          tasksArr.length == 0 ? styles.meContainerNull : "d-none"
        }`}
      >
        <h2 className="text-white text-center">There are no avialble tasks</h2>
      </div>
      <div className={`${styles.meContainer}`}>
        <div className="d-flex justify-content-center flex-wrap">
          {tasksArr.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
      ;
    </>
  );
}
