/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "./types";

export const useDynamicForm = (fields: FormField[], initialData?: Record<string, any>) => {
  const defaultValues = React.useMemo(() => 
    fields.reduce((acc, field) => {
      acc[field.name] = initialData?.[field.name] ?? field.value ?? "";
      return acc;
    }, {} as Record<string, any>),
    [fields, initialData]
  );

  const formMethods = useForm({ defaultValues });

  return {
    ...formMethods,
    handleSubmit: formMethods.handleSubmit,
    reset: formMethods.reset,
  };
};
