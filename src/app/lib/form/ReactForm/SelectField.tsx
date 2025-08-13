import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FormField } from "./types";

const SelectField: React.FC<{ field: FormField }> = ({ field }) => {
  const { control, formState: {  } } = useFormContext();
  
  return (
    <div className="w-full">
      <Controller
        name={field.name}
        control={control}
        rules={{ required: field.required }}
        render={({ field: { onChange, value } }) => (
          <>
            {field.type === "creatable-select" ? (
              <CreatableSelect
                isMulti
                options={field.options}
                value={field.options?.filter(opt => 
                  Array.isArray(value) ? value.includes(opt.value) : value === opt.value
                )}
                onChange={(selected) => onChange(selected?.map(opt => opt.value))}
                className="react-select-container"
              />
            ) : (
              <Select
                options={field.options}
                value={field.options?.find(opt => opt.value === value)}
                onChange={(selected) => onChange(selected?.value)}
                className="react-select-container"
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default React.memo(SelectField);
