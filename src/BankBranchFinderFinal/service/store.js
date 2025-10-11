import { configureStore } from "@reduxjs/toolkit";
import branchesReducer from "./branchesSlice";

export const store = configureStore({
  reducer: {
    branches: branchesReducer,
  },
});
