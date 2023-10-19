import { configureStore } from "@reduxjs/toolkit";
import { Taskreducer } from "./TasksSlice";
import { addTask, addTaskreducer } from "./AddTaskSlice";

let Store = configureStore({
  reducer: {
    Tasks: Taskreducer,
    addTask: addTaskreducer,
  },
});
export default Store;
