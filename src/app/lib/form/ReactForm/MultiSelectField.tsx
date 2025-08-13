import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { FormField } from "./types";

const MultiSelectField: React.FC<{ field: FormField }> = ({ field }) => (
  <Controller
    name={field.name}
    render={({ field: { onChange, value } }) => (
      <Select
        isMulti
        options={field.options}
        value={field.options?.filter(opt => value?.includes(opt.value))}
        onChange={selected => onChange(selected?.map(opt => opt.value))}
        className="react-select-container"
      />
    )}
  />
);
export default React.memo(MultiSelectField);
