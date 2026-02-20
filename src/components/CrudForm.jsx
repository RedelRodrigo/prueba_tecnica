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
    <div>
      <Form className="border w-150 p-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 border flex gap-8 p-3 w-full">
          <Form.Label className="w-100">Nombre de la tarea</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre de la tarea"
            className="border-b w-100"
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid" className="text-red-500 ">
              {errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3 border flex gap-8 p-3 w-full">
          <Form.Label className="w-100">Descripción de la tarea</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingrese la descripción de la tarea"
            className="border-b w-100"
            isInvalid={!!errors.description}
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid" className="text-red-500 ">
              {errors.description}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {successMessage && (
          <div className="alert alert-success mb-3">{successMessage}</div>
        )}

        {errors.submit && (
          <div className="alert alert-danger mb-3">{errors.submit}</div>
        )}

        <div className="flex w-full justify-center gap-3">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {isEditMode ? "Actualizar Tarea" : "Agregar Tarea"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white p-2 rounded"
          >
            {isEditMode ? "Cancelar" : "Limpiar"}
          </button>
        </div>
      </Form>
    </div>
  );
};
