import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import jobSlice from "./job-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
  },
});

export default store;
