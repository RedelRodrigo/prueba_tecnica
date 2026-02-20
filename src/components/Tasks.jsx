import { useState } from "react";
import { Link } from "react-router-dom";
import { CrudForm } from "./CrudForm";
import { useLocalStorageTasks } from "../hooks/useLocalStorageTasks";

export const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useLocalStorageTasks();
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDelete = (id) => {
    deleteTask(id);
    if (taskToEdit && taskToEdit.id === id) {
      setTaskToEdit(null);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditComplete = () => {
    setTaskToEdit(null);
  };

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
              onAdd={addTask}
              onUpdate={updateTask}
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
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
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
