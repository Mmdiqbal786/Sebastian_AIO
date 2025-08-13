/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import Select from "react-select";
// import { FormField } from "./types";

// interface DependentSelectProps {
//   field: FormField;
//   dependsOn?: string;
//   fetchUrl?: string;
// }

// const DependentSelect: React.FC<DependentSelectProps> = ({ 
//   field,
//   dependsOn,
//   fetchUrl
// }) => {
//   const { control, watch, setValue } = useFormContext();
//   const [options, setOptions] = useState(field.options || []);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const parentValue = watch(dependsOn || "");

//   useEffect(() => {
//     const fetchDependentOptions = async () => {
//       if (!dependsOn || !parentValue || !fetchUrl) {
//         setOptions(field.options || []);
//         return;
//       }
      
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${fetchUrl}?parent=${parentValue}`);
//         const data = await response.json();
        
//         setOptions(data.map((item: any) => ({
//           value: item._id,
//           label: item.name
//         })));

//         setValue(field.name, "");
//       } catch (error) {
//         console.error("Error fetching options:", error);
//         setOptions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDependentOptions();
//   }, [parentValue, dependsOn, fetchUrl, field.name, setValue, field.options]);

//   return (
//     <div className="w-full mb-4">
//       <label className="block text-sm font-medium mb-1">
//         {field.label}
//         {field.required && <span className="text-red-500">*</span>}
//       </label>
      
//       <Controller
//         name={field.name}
//         control={control}
//         rules={{ required: field.required }}
//         render={({ field: { onChange, value }, formState: { errors } }) => (
//           <div>
//             <Select
//               options={options}
//               value={options.find(opt => opt.value === value)}
//               onChange={(selected) => onChange(selected?.value)}
//               isDisabled={!parentValue || isLoading}
//               isLoading={isLoading}
//               className="react-select-container"
//               placeholder={isLoading ? "Loading..." : `Select ${field.label}`}
//             />
//             {errors[field.name] && (
//               <p className="text-red-500 text-sm mt-1">
//                 {field.label} is required
//               </p>
//             )}
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default React.memo(DependentSelect);

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { FormField } from "./types";
import { useFetchData } from "@/app/lib/fetchHelper";

const ControlSelectField: React.FC<{ field: FormField }> = ({ field }) => {
  const { control, watch, setValue, formState: { } } = useFormContext();
  const dependencyValue = field.dependsOn ? watch(field.dependsOn) : null;
  const effectiveApiType = dependencyValue || (field as any).apiType || "";
  const fetchEndpoint = field.fetchUrl ?? "";
  const { formattedData } = useFetchData(effectiveApiType, fetchEndpoint);
  const finalOptions = useMemo(() => {
    return field.fetchUrl ? formattedData : field.options || [];
  }, [field.fetchUrl, formattedData, field.options]);
  const [options, setOptions] = useState(finalOptions);
  useEffect(() => {
    setOptions(finalOptions);
    if (field.dependsOn && dependencyValue) {
      setValue(field.name, "");
    }
  }, [finalOptions, dependencyValue, field.dependsOn, field.name, setValue]);

  return (
    <div className="w-full mb-4">
      <Controller
        name={field.name}
        control={control}
        rules={{ required: field.required }}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              options={options}
              value={options.find(opt => opt.value === value) || null}
              onChange={(selected) => {
                onChange(selected?.value);
                if (field.onChange) {
                  field.onChange(field.name, selected?.value);
                }
              }}
              isDisabled={(!!field.dependsOn && !dependencyValue)}
              className="react-select-container"
              placeholder={`Select ${field.label || field.name}`}
            />
          </>
        )}
      />
    </div>
  );
};

export default React.memo(ControlSelectField);
