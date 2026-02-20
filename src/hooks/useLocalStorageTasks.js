import { useState, useEffect } from "react";

const STORAGE_KEY = "tasks";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(loadFromStorage);

  // Sincronizar con localStorage cada vez que cambian las tareas
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ name, description }) => {
    const newTask = {
      id: crypto.randomUUID(),
      name,
      description,
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = ({ id, name, description }) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, name, description } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};
