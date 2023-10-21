import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let deleteTask = createAsyncThunk(
  "DeleteTasks/deleteTask",
  async (taskID, { rejectWithValue }) => {
    try {
      let {
        data: { Message },
      } = await axios.delete(
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
      return Message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

let DeleteTaskSlice = createSlice({
  name: "DeleteTasks",
  initialState: { message: "" },
  extraReducers: (builder) => {
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      console.log("hi");
      state.message = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.message = action.payload;
    });
  },
});

export let deleteTaskreducer = DeleteTaskSlice.reducer;
