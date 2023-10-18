import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let getTasks = createAsyncThunk("Tasks/getTasks", async () => {
  let {
    data: { alltasks },
  } = await axios.get("https://task-app-nkax.onrender.com/tasks/all");
  return alltasks;
});

let tasksSlice = createSlice({
  name: "Tasks",
  initialState: { tasksArr: [] },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasksArr = action.payload;
    });
  },
});

export let Taskreducer = tasksSlice.reducer;
