/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { useFieldArray, Controller, useFormContext } from "react-hook-form";
// import { FormField } from "./types";

// const SubTableField: React.FC<{ field: FormField }> = ({ field }) => {
//   const { control } = useFormContext();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: field.name,
//   });

//   return (
//     <div className="subtable-wrapper">
//       {fields.map((item, index) => (
//         <div key={item.id} className="subtable-row">
//           {field.subFields?.map(subField => (
//             <Controller
//               key={subField.name}
//               name={`${field.name}.${index}.${subField.name}`}
//               control={control}
//               render={({ field: { value, onChange } }) => (
//                 <input
//                   type={subField.type}
//                   value={value}
//                   onChange={onChange}
//                   placeholder={subField.placeholder}
//                 />
//               )}
//             />
//           ))}
//           <button type="button" onClick={() => remove(index)}>Remove</button>
//         </div>
//       ))}
//       <button type="button" onClick={() => append({})}>Add Row</button>
//     </div>
//   );
// };
// export default React.memo(SubTableField);

import React from "react";
import { 
  useFieldArray, 
  Controller, 
  useFormContext,
  FieldErrors,
  FieldValues,
  FieldError,
  Merge,
  FieldErrorsImpl
} from "react-hook-form";
import { FormField } from "./types";

const SubTableField: React.FC<{ field: FormField }> = ({ field }) => {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });

  const getRowError = (rowIndex: number, fieldName: string) => {
    const fieldErrors = errors[field.name] as 
      | Array<FieldErrors<FieldValues>>
      | undefined;
      
    return fieldErrors?.[rowIndex]?.[fieldName];
  };

  const getErrorMessage = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ): string => {
    if (!error) return '';
    if (typeof error === 'string') return error;
    
    // Use a type assertion for error.message
    const message = (error as any).message;
    if (typeof message === 'string') return message;
    if (message?.message && typeof message.message === 'string') {
      return message.message;
    }
    return `${field.label} is required`;
  };

  const getDefaultRow = () => {
    return field.subFields?.reduce((acc, subField) => {
      acc[subField.name] = subField.value || "";
      return acc;
    }, {} as Record<string, any>) || {};
  };

  return (
    <div className="space-y-6 p-4 rounded-lg shadow-md">
      {fields.map((item, rowIndex) => (
        <div key={item.id} className="bg-white border rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h4 className="text-lg font-semibold">Row {rowIndex + 1}</h4>
            <button
              type="button"
              onClick={() => remove(rowIndex)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field.subFields?.map((subField) => {
              const fieldName = `${field.name}.${rowIndex}.${subField.name}`;
              const error = getRowError(rowIndex, subField.name);
              const errorMessage = getErrorMessage(error);
              
              return (
                <div key={fieldName} className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    {subField.label}
                  </label>
                  <Controller
                    name={fieldName}
                    control={control}
                    rules={{ required: subField.required }}
                    render={({ field: { value, onChange } }) => (
                      subField.type === 'select' ? (
                        <select
                          value={value || ""}
                          onChange={onChange}
                          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">{`Select ${subField.label}`}</option>
                          {subField.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={subField.type}
                          value={value || ""}
                          onChange={onChange}
                          placeholder={subField.placeholder}
                          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )
                    )}
                  />
                  {errorMessage && (
                    <span className="mt-1 text-sm text-red-600">
                      {errorMessage}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => append(getDefaultRow())}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default React.memo(SubTableField);
