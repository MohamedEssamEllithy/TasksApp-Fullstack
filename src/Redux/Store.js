import { configureStore } from "@reduxjs/toolkit";
import { addTask, addTaskreducer } from "./AddTaskSlice";

let Store = configureStore({
  reducer: {
    addTask: addTaskreducer,
  },
});
export default Store;
