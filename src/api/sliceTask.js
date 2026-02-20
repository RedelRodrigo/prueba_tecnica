import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "Tasks",
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "Tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `Tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, name, description }) => ({
        url: `Tasks/${id}`,
        method: "PUT",
        body: { id, name, description },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
