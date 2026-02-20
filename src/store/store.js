import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/slices";
import { tasksApi } from "../api/sliceTask";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(tasksApi.middleware),
});
