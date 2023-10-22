import React, { useEffect, useState } from "react";
import styles from "./AddForm.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask, changeMsg } from "../../Redux/AddTaskSlice";

function AddForm(props) {
  let [isLoading, setIsLoading] = useState(false);
  let [added, setAdded] = useState("");
  let dispatch = useDispatch();
  let { message } = useSelector((state) => state.addTask);

  let validationSchema = Yup.object({
    title: Yup.string()
      .max(25, "Task title should be 25 character at max")
      .min(5, "Task title should be 5 character at min")
      .required("This field is required"),
    description: Yup.string()
      .max(100, "Task Desc. should be 100 character at max")
      .min(3, "Task Desc should be 3 character at min")
      .required("This field is required"),
    status: Yup.string()
      .oneOf(
        ["Done", "ToDo", "Doing"],
        "Should be one of the following Done, ToDo or Doing"
      )
      .required("This field is required"),
    assignTo: Yup.string()
      .matches(
        /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/,
        "Invalid Email format"
      )
      .required("This field is required"),
    deadline: Yup.date().required("This field is required"),
  });
  let form = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      assignTo: "",
      deadline: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setAdded("");
      dispatch(changeMsg());
      setIsLoading(true);
      dispatch(addTask(values));
    },
  });
  useEffect(() => {
    if (message != "") {
      props.handleRefresh();
      setIsLoading(false);
    }
    setAdded(message);
  }, [message]);
  useEffect(() => {
    setAdded("");
  }, []);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absoulte", top: "3rem" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add new task</Modal.Title>
          <button
            className={`${styles.meBtnClose}`}
            onClick={() => {
              props.setAddTask(false);
            }}
          >
            <i className="fa-solid fa-x" style={{ color: " #000" }}></i>
          </button>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={form.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="title">Title:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.title
                    ? form.errors.title
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="text"
                id="title"
                name="title"
                placeholder="Enter task title"
                value={form.values.title}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.title && form.touched.title ? (
                <p className={`${styles.meAlert}`}>{form.errors.title}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.description
                    ? form.errors.description
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="text"
                id="description"
                name="description"
                placeholder="Enter your task description"
                value={form.values.description}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.description && form.touched.description ? (
                <p className={`${styles.meAlert}`}>{form.errors.description}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status">status:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.status
                    ? form.errors.status
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="status"
                id="status"
                name="status"
                placeholder="Enter the current status"
                value={form.values.status}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.status && form.touched.status ? (
                <p className={`${styles.meAlert}`}>{form.errors.status}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="assignTo">Assigned to:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.assignTo
                    ? form.errors.assignTo
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="text"
                id="assignTo"
                name="assignTo"
                placeholder="Enter the assigned to Email "
                value={form.values.assignTo}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.assignTo && form.touched.assignTo ? (
                <p className={`${styles.meAlert}`}>{form.errors.assignTo}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-5">
              <label htmlFor="deadline">Due Date:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.deadline
                    ? form.errors.deadline
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="date"
                id="deadline"
                name="deadline"
                placeholder="Enter task due date"
                value={form.values.deadline}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.errors.deadline && form.touched.deadline ? (
                <p className={`${styles.meAlert}`}>{form.errors.deadline}</p>
              ) : (
                ""
              )}
            </div>
            <div
              className={`${
                added == "Task has been added successfully"
                  ? styles.meMsg
                  : styles.meMsg2
              } mb-2 text-center`}
            >
              {added != "" ? added : null}
            </div>
            <button type="submit" className={`${styles.meBtn} mb-2`}>
              {isLoading ? (
                <i className="fa fa-spin fa-spinner"></i>
              ) : (
                "Add new task"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default AddForm;
