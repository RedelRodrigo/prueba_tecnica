import { z } from "zod";

const tareaSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),
});

export const useZod = () => {
  const validate = (data: { name: string; description: string }) => {
    try {
      tareaSchema.parse(data);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        return errors;
      }
      return {};
    }
  };

  const validateField = (fieldName: string, value: string) => {
    try {
      const fieldSchema =
        tareaSchema.shape[fieldName as keyof typeof tareaSchema.shape];
      fieldSchema.parse(value);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || null;
      }
      return null;
    }
  };

  return { validate, validateField };
};
