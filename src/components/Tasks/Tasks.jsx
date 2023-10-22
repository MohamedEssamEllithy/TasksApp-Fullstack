import React, { useContext, useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import TaskCard from "../TaskCard/TaskCard";
import AddForm from "../AddForm/AddForm";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Tasks() {
  let [addTask, setAddTask] = useState(false);
  const queryClient = useQueryClient();
  let [tasksArr, setTasksArr] = useState([]);
  let [ToDoflag, setToDoflag] = useState(false);
  let [Doingflag, setDoingflag] = useState(false);
  let [Doneflag, setDoneflag] = useState(false);
  let [allflag, setallflag] = useState(false);

  async function getTasks() {
    return await axios.get("https://task-app-nkax.onrender.com/tasks/all");
  }

  let { data, isLoading, refetch } = useQuery("getTasks", getTasks);
  
 useEffect(() => {
   if (!isLoading && data) {
     setTasksArr(data.data.alltasks);
     setallflag(true);
     setToDoflag(false);
     setDoingflag(false);
     setDoneflag(false);
   }
 }, [isLoading, data]);

 
  function Alltasks() {
    setTasksArr(data.data.alltasks);
    setallflag(true)
    setToDoflag(false);
    setDoingflag(false);
    setDoneflag(false);


  };

  const ToDo = ()=>{
    let ToDoTasks = data.data.alltasks.filter((task)=>task.status =="ToDo")
     setTasksArr(ToDoTasks);
     setToDoflag(true)
     setallflag(false);
     setDoingflag(false);
     setDoneflag(false);
  }

   const Doing = () => {
     let DoingTasks = data.data.alltasks.filter((task) => task.status == "Doing");
     setTasksArr(DoingTasks);
     setDoingflag(true);
     setallflag(false);
     setToDoflag(false);
     setDoneflag(false);
   };
 
   const Done = () => {
     let DoneTasks = data.data.alltasks.filter(
       (task) => task.status == "Done"
     );
     setTasksArr(DoneTasks);
     setDoneflag(true);
     setallflag(false);
     setToDoflag(false);
     setDoingflag(false);
   };
   
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
        <h2 className="text-white text-center">There are no tasks</h2>
      </div>
      <div className={`d-flex  ${styles.meContainer}`}>
        <Navbar expand="lg" className={`bg-body-light ${styles.NAVbar}`}>
          <Container>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="border border-light text-light"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className={`me-auto  ${styles.Navbr}`}>
                <Nav.Link
                  className={
                    allflag
                      ? `text-light mt-4 ${styles.navlnkActive}`
                      : `text-light mt-4 ${styles.navlnk}`
                  }
                  onClick={Alltasks}
                  title="All Tasks"
                >
                  All
                </Nav.Link>
                <Nav.Link
                  className={
                    ToDoflag
                      ? `text-light my-2 ${styles.navlnkActive}`
                      : `text-light my-2 ${styles.navlnk}`
                  }
                  onClick={ToDo}
                  title="ToDo Tasks"
                >
                  <i class="fa-regular fa-pen-to-square fa-xl"></i>
                </Nav.Link>
                <Nav.Link
                  className={
                    Doingflag
                      ? `text-light my-2 ${styles.navlnkActive}`
                      : `text-light my-2 ${styles.navlnk}`
                  }
                  onClick={Doing}
                  title="Doing Tasks"
                >
                  <i class="fa-solid fa-person-digging fa-xl"></i>
                </Nav.Link>
                <Nav.Link
                  className={
                    Doneflag
                      ? `text-light my-4 ${styles.navlnkActive}`
                      : `text-light my-4 ${styles.navlnk}`
                  }
                  onClick={Done}
                  title="Done Tasks"
                >
                  <i class="fa-solid fa-check-double fa-xl"></i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
