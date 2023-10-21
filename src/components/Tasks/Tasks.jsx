import React, { useContext, useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import TaskCard from "../TaskCard/TaskCard";
import AddForm from "../AddForm/AddForm";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function Tasks() {
  let [addTask, setAddTask] = useState(false);
  const queryClient = useQueryClient();
  let tasksArr = [];

  function getTasks() {
    return axios.get("https://task-app-nkax.onrender.com/tasks/all");
  }

  let { data, isLoading, refetch } = useQuery("getTasks", getTasks);
  if (!isLoading) {
    tasksArr = data.data.alltasks;
  }
  useEffect(() => {
    if (!isLoading) {
      tasksArr = data.data.alltasks;
    }
  }, [isLoading]);
  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      <div className={`${addTask ? styles.meScroll : null}`}></div>
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
            <TaskCard
              key={task._id}
              task={task}
              handleRefresh={handleRefresh}
            />
          ))}
          <div className={`${styles.meAddCard}`}>
            <button
              className={`${styles.meAdd}`}
              onClick={() => setAddTask(true)}
            >
              <i
                className="fa-solid fa-plus fa-3x"
                style={{ color: "green" }}
              ></i>
            </button>
            create new task
          </div>
        </div>
      </div>
      {addTask ? (
        <AddForm setAddTask={setAddTask} handleRefresh={handleRefresh} />
      ) : null}
    </>
  );
}
