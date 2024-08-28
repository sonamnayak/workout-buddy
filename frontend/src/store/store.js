import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import workoutsSlice from "./slices/workoutsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    workouts: workoutsSlice,
  },
});

export default store;
