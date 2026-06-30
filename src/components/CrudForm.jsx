import { useState, useEffect, useMemo } from "react";
import Form from "react-bootstrap/Form";
import { useZod } from "../hooks/useZod";

export const CrudForm = ({ taskToEdit, onEditComplete, onAdd, onUpdate }) => {
  const initialFormData = useMemo(() => {
    return taskToEdit
      ? {
          name: taskToEdit.name,
          description: taskToEdit.description,
        }
      : {
          name: "",
          description: "",
        };
  }, [taskToEdit]);

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { validate, validateField } = useZod();
  const isEditMode = !!taskToEdit;

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditMode) {
      onUpdate({ id: taskToEdit.id, ...formData });
      setSuccessMessage("¡Tarea actualizada correctamente!");
      setFormData({ name: "", description: "" });
      setErrors({});
      setTimeout(() => {
        setSuccessMessage("");
        if (onEditComplete) onEditComplete();
      }, 1500);
    } else {
      onAdd(formData);
      setSuccessMessage("¡Tarea agregada correctamente!");
      setFormData({ name: "", description: "" });
      setErrors({});
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", description: "" });
    setErrors({});
    setSuccessMessage("");
    if (onEditComplete) onEditComplete();
  };

  return (
    <div className="w-full">
      <Form className="border p-4 rounded-lg shadow-sm" onSubmit={handleSubmit}>
        <Form.Group className="mb-4 flex flex-col md:flex-row gap-4">
          <Form.Label className="md:w-1/4 font-semibold text-gray-200">Nombre de la tarea</Form.Label>
          <div className="flex-1 w-full">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre de la tarea"
              className="w-full border-gray-600 bg-gray-800 text-white"
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid" className="text-red-400 text-sm mt-1">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-4 flex flex-col md:flex-row gap-4">
          <Form.Label className="md:w-1/4 font-semibold text-gray-200">Descripción de la tarea</Form.Label>
          <div className="flex-1 w-full">
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ingrese la descripción de la tarea"
              className="w-full border-gray-600 bg-gray-800 text-white"
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid" className="text-red-400 text-sm mt-1">
                {errors.description}
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>

        {successMessage && (
          <div className="alert alert-success mb-4 p-3 bg-green-900 text-green-100 rounded-lg">{successMessage}</div>
        )}

        {errors.submit && (
          <div className="alert alert-danger mb-4 p-3 bg-red-900 text-red-100 rounded-lg">{errors.submit}</div>
        )}

        <div className="flex flex-col sm:flex-row w-full justify-center gap-3 mt-6">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            {isEditMode ? "Actualizar Tarea" : "Agregar Tarea"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {isEditMode ? "Cancelar" : "Limpiar"}
          </button>
        </div>
      </Form>
    </div>
  );
};
