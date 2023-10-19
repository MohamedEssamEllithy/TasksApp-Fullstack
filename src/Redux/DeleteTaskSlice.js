import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let deleteTask = createAsyncThunk(
  "DeleteTasks/deleteTask",
  async (taskID) => {
    let { data } = await axios.delete(
      "https://task-app-nkax.onrender.com/tasks/delete",

      {
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          taskID,
        },
      }
    );
    return data;
  }
);

let DeleteTaskSlice = createSlice({
  name: "DeleteTasks",
  initialState: { message: "" },
});

export let deleteTaskreducer = DeleteTaskSlice.reducer;
