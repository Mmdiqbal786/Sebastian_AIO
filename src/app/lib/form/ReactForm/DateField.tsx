/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import { FormField } from "./types";

const formatForDisplay = (value: string | undefined): string => {
  if (!value) {
    return "";
  }
  return value.includes("T") ? value.split("T")[0] : value;
};

const formatForStorage = (value: string): string => {
  if (value.includes("T")) {
    return value;
  }
  return `${value}T00:00`;
};

interface DateFieldProps {
  field: FormField;
  control: any;
}

const DateField: React.FC<DateFieldProps> = ({ field, control }) => (
  <Controller
    name={field.name}
    control={control}
    rules={{ required: field.required }}
    render={({ field: { value, onChange } }) => (
      <input
        type="date"
        name={field.name}
        value={formatForDisplay(value)}
        onChange={(e) => {
          onChange(formatForStorage(e.target.value));
        }}
        className="input input-bordered w-full p-2"
        min={field.minDate && formatForDisplay(field.minDate)}
        max={field.maxDate && formatForDisplay(field.maxDate)}
      />
    )}
  />
);

export default React.memo(DateField);
