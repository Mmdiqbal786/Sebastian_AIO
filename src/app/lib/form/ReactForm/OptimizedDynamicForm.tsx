"use client";

import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import FormFieldRenderer from "./FormFieldRenderer";
import { useDynamicForm } from "./useDynamicForm";
import { DynamicFormProps } from "./types";

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  initialData,
  onSubmit,
  onChange,
  loading,
}) => {
  const formMethods = useDynamicForm(fields, initialData);
  const { watch } = formMethods;
  const formValues = watch();

  useEffect(() => {
    if (onChange) {
      onChange("form", formValues);
    }
  }, [formValues, onChange]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="space-y-4 max-h-[80vh] overflow-y-auto px-2"
      >
        {fields.map((field, index) => (
          <FormFieldRenderer key={`${field.name}-${index}`} field={field} />
        ))}

        <div className="form-control pt-1 py-2">
          <button
            type="submit"
            className={`btn btn-primary bg-blue-600 w-full p-1 text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default React.memo(DynamicForm);
