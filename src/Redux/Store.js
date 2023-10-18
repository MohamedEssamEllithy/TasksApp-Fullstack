import { configureStore } from "@reduxjs/toolkit";
import { Taskreducer } from "./TasksSlice";

let Store = configureStore({
  reducer: {
    Tasks: Taskreducer,
  },
});
export default Store;
