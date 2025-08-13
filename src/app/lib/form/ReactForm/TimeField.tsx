/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormField } from "./types";
import { Controller } from "react-hook-form";

interface TimeFieldProps {
  field: FormField;
  control: any;
}

const TimeField: React.FC<TimeFieldProps> = ({ field, control }) => (
  <Controller
    name={field.name}
    control={control}
    rules={{ required: field.required }}
    render={({ field: { value, onChange } }) => (
      <input
        type="time"
        value={value || ""}
        onChange={onChange}
        className="input input-bordered w-full p-2"
        min={field.minTime}
        max={field.maxTime}
        step={field.step || 900}
      />
    )}
  />
);

export default React.memo(TimeField);