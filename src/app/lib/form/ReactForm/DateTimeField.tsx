/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import { FormField } from "./types";

interface DateTimeFieldProps {
  field: FormField;
  control: any;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({ field, control }) => (
  <Controller
    name={field.name}
    control={control}
    rules={{ required: field.required }}
    render={({ field: { value, onChange } }) => (
      <input
        type="datetime-local"
        value={value || ""}
        onChange={onChange}
        className="input input-bordered w-full p-2"
        min={field.minDate}
        max={field.maxDate}
      />
    )}
  />
);

export default React.memo(DateTimeField);
