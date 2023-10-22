import React, { useEffect, useState } from "react";
import styles from "./UpdateForm.module.css";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useQueryClient, useMutation } from "react-query"; 
import axios from "axios";

function UpdateForm(props) {
  
  let {task} =props
  const [added, setAdded] = useState("");
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(25, "Task title should be 25 characters at most")
      .min(5, "Task title should be at least 5 characters")
      .required("This field is required"),
    status: Yup.string()
      .oneOf(
        ["Done", "ToDo", "Doing"],
        "Should be one of the following: Done, ToDo, or Doing"
      )
      .required("This field is required"),
  });

  const form = useFormik({
    initialValues: {
      title: task.title,
      status: task.status,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateTaskMutation.mutate(values);
      
    },
  });



  
  const updateTaskMutation = useMutation(
    (values) => {
      return axios.put(
        `https://task-app-nkax.onrender.com/tasks/update`,

        {
          taskID: task._id,
          ...values, 
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    },
    {
      onSettled: (data) => {
        if (data && data.status == 201) {
          console.log("daaaate",data)
          setAdded("Task has been updated successfully");
        } else {
          setAdded("Failed to update task. Please try again.");
        }
        refetch();
      },
    }
  );

  const refetch = () => {
    queryClient.invalidateQueries("updateTask");
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "absolute", top: "3rem" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Update task</Modal.Title>
          <button
            className={styles.meBtnClose}
            onClick={() => {
              props.setUpdateTask(false);
            }}
          >
            <i className="fa-solid fa-x" style={{ color: "#000" }}></i>
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
              <label htmlFor="status">Status:</label>
              <br />
              <input
                className={`${styles.meInput} ${
                  form.touched.status
                    ? form.errors.status
                      ? styles.meFail
                      : styles.meSuccess
                    : ""
                }`}
                type="text"
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
            <div
              className={`${
                added === "Task has been updated successfully"
                  ? styles.meMsg
                  : styles.meMsg2
              } mb-2 text-center`}
            >
              {added !== "" ? added : null}
            </div>
            <button
              type="submit"
              className={`${styles.meBtn} mb-5`}
              disabled={updateTaskMutation.isLoading}
            >
              {updateTaskMutation.isLoading ? (
                <i className="fa fa-spin fa-spinner"></i>
              ) : (
                "Update task"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default UpdateForm;
