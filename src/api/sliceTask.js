// Este archivo ya no se utiliza.
// El gestor de tareas ahora usa localStorage a través del hook useLocalStorageTasks.
// Ver: src/hooks/useLocalStorageTasks.js

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
