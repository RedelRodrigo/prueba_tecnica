import { useState } from "react";
import { Link } from "react-router-dom";
import { CrudForm } from "./CrudForm";
import { useGetTasksQuery, useDeleteTaskMutation } from "../api/sliceTask";

export const Tasks = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDelete = async (id) => {
    try {
      console.log("Eliminando tarea con ID:", id, "Tipo:", typeof id);
      await deleteTask(id).unwrap();
      console.log("Tarea eliminada exitosamente");
      // Si la tarea que se está editando es la que se eliminó, cancelar edición
      if (taskToEdit && taskToEdit.id === id) {
        setTaskToEdit(null);
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditComplete = () => {
    setTaskToEdit(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Cargando tareas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error en getTasks:", error);
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2 text-center">
            Error al cargar
          </h2>
          <p className="bg-red-500 text-center ">
            {error.message || JSON.stringify(error)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gray-900 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-600">
                Gestión de Tareas
              </h1>
              <p className="text-white mt-1">
                Organiza tu día de manera eficiente
              </p>
            </div>
            <Link
              to="/"
              className="group relative inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>← Pokémon</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Section */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-3xl">{taskToEdit ? "✏️" : "📝"}</span>
              {taskToEdit ? "Editar Tarea" : "Nueva Tarea"}
            </h2>
            <CrudForm
              taskToEdit={taskToEdit}
              onEditComplete={handleEditComplete}
            />
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">
              Lista de Tareas ({tasks?.length || 0})
            </h2>
          </div>
          {!tasks || tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No hay tareas registradas
            </p>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-900"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {task.name}
                      </h3>
                      <p className="text-white">{task.description}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        ID: {task.id}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        disabled={isDeleting}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
