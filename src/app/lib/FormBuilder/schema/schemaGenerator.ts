/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";

export const generateSchema = (fields: any[]) => {
  const shape: Record<string, any> = {};
  fields.forEach((f) => {
    let schema: any = z.any();
    switch (f.type) {
      case "text":
      case "textarea":
        schema = f.required ? z.string().min(1, "Required") : z.string().optional();
        break;
      case "email":
        schema = f.required ? z.string().email("Invalid email") : z.string().email("Invalid email").optional();
        break;
      case "number":
        schema = f.required ? z.number() : z.number().optional();
        break;
      case "phone":
        schema = f.required
          ? z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone")
          : z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone").optional();
        break;
      case "file":
      case "multi-file":
        schema = f.required ? z.string().min(1, "Required") : z.string().optional();
        break;
      case "subtable":
        schema = z.array(generateSchema(f.fields));
        break;
    }
    shape[f.name] = schema;
  });
  return z.object(shape);
};
