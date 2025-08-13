/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import { Controller } from "react-hook-form";
// import Select from "react-select";
// import { FormField } from "./types";

// interface ApiItem {
//   id: string;
//   name: string;
//   // Add other expected properties from your API response here
// }

// const DynamicMultiSelectField: React.FC<{ field: FormField }> = ({ field }) => {
//   const [options, setOptions] = useState(field.config?.defaultOptions || []);
//   const { apiEndpoint, queryParams = {} } = field.config || {};

//   useEffect(() => {
//     const fetchOptions = async () => {
//       if (apiEndpoint) {
//         try {
//           const response = await fetch(
//             `${apiEndpoint}?${new URLSearchParams(queryParams)}`
//           );
//           const data: ApiItem[] = await response.json();
//           setOptions(data.map((item: ApiItem) => ({
//             value: item.id,
//             label: item.name
//           })));
//         } catch (error) {
//           console.error("Error fetching options:", error);
//         }
//       }
//     };
//     fetchOptions();
//   }, [apiEndpoint, queryParams]);

//   return (
//     <Controller
//       name={field.name}
//       render={({ field: { value, onChange } }) => (
//         <Select
//           isMulti
//           options={options}
//           value={options.filter(opt => value?.includes(opt.value))}
//           onChange={selected => onChange(selected.map(opt => opt.value))}
//         />
//       )}
//     />
//   );
// };

// export default React.memo(DynamicMultiSelectField);

"use client";

import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "./types";

interface IOption {
  label: string;
  value: string;
}

interface GroupConfig {
  groupName: string;
  groupLabel?: string;
  defaultOptions: IOption[];
  selectionLimit: number;
  emptyMessage?: string;
  placeholder?: string;
}

interface DynamicGroupedMultiSelectFieldProps {
  field: FormField;
}

const DynamicGroupedMultiSelectField: React.FC<DynamicGroupedMultiSelectFieldProps> = ({ field }) => {
  const { control, setValue, watch, formState: { errors } } = useFormContext();
  const groups: GroupConfig[] = (field.config as any)?.groups || [];
  
  // Watch the entire field value (e.g., "foodSelections").
  const currentValue = watch(field.name);

  // Use an effect to set the default value if the field is not yet set.
  useEffect(() => {
    if ((!currentValue || Object.keys(currentValue).length === 0) && field.defaultValue) {
      console.log("Setting default dynamic value:", field.defaultValue);
      setValue(field.name, field.defaultValue);
    }
  }, [currentValue, field.defaultValue, field.name, setValue]);

  if (groups.length === 0) {
    return (
      <p className="text-gray-500 text-sm bg-white p-2">
        Please select a plan to see food options.
      </p>
    );
  }

  return (
    <div className="w-full space-y-4">
      {groups.map((group, index) => (
        <div key={index} className="border p-4 rounded">
          <p className="text-sm font-semibold text-white mb-2">
            In <span className="text-red-600">{group.groupLabel || group.groupName}</span> you can select up to {group.selectionLimit} items.
          </p>
          <Controller
            name={`${field.name}.${group.groupName}`}
            control={control}
            rules={{
              validate: (selected: string[]) => {
                if (selected && selected.length > group.selectionLimit) {
                  return `You can only select up to ${group.selectionLimit} items in ${group.groupLabel || group.groupName}.`;
                }
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => {
              // Use the default value from field.defaultValue if value is not yet set.
              const groupDefault = field.defaultValue ? field.defaultValue[group.groupName] : [];
              const selectedValues: string[] = value ?? groupDefault ?? [];
              console.log("Controller received value for group", group.groupName, ":", selectedValues);

              if (group.defaultOptions.length === 0) {
                return (
                  <p className="text-gray-500 text-sm">
                    {group.emptyMessage || "No options available"}
                  </p>
                );
              }
              const handleCheckboxChange = (optionValue: string) => {
                let newSelected: string[];
                if (selectedValues.includes(optionValue)) {
                  newSelected = selectedValues.filter(val => val !== optionValue);
                } else {
                  newSelected = [...selectedValues, optionValue];
                }
                onChange(newSelected);
              };
              return (
                <>
                  <div className="flex flex-col space-y-2 bg-white p-2">
                    {group.defaultOptions.map((opt: IOption) => (
                      <label key={opt.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedValues.includes(opt.value)}
                          onChange={() => handleCheckboxChange(opt.value)}
                        />
                        <span className="ml-2 text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  {selectedValues.length === 0 && (
                    <p className="text-white text-sm mt-1">
                      {group.placeholder || "Please select options"}
                    </p>
                  )}
                  {(errors[field.name] as any)?.[group.groupName] && (
                    <p className="text-red-500 text-sm mt-1">
                      {(errors[field.name] as any)[group.groupName].message?.toString()}
                    </p>
                  )}
                </>
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(DynamicGroupedMultiSelectField);
