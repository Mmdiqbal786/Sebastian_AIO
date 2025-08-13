/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormField } from "./types";

interface InputFieldProps {
  field: FormField;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({ field, register }) => {
  const commonProps = {
    ...register(field.name, {
      required: field.required,
      pattern: field.validation?.pattern
        ? {
            value: field.validation.pattern,
            message: field.validation.message,
          }
        : undefined,
    }),
    placeholder: field.placeholder,
    maxLength: field.maxLength,
    className: "input input-bordered w-full p-1 text-sm py-2",
  };

  if (field.type === "textarea") {
    return <textarea {...commonProps} rows={field.initialRows} />;
  }

  return <input type={field.type} {...commonProps} />;
};

export default React.memo(InputField);
