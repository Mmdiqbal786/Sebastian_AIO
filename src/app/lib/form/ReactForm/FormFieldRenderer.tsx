// "use client";

// import React from "react";
// import { useFormContext } from "react-hook-form";
// import FieldComponentSelector from "./FieldComponentSelector";
// import { FormField } from "./types";

// interface FormFieldRendererProps {
//   field: FormField;
// }

// const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ field }) => {
//   const { register, formState: { errors } } = useFormContext();
//   const error = errors[field.name];

//   return (
//     <div className="form-control w-full space-y-2 text-black">
//       {field.label && (
//         <label className="label text-sm mt-8 text-white mb-2">
//           {field.label}
//           {field.required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
      
//       <FieldComponentSelector field={field} register={register} />
      
//       {error && (
//         <p className="text-red-500 text-sm mt-0.5">
//           {error.message?.toString() || `${field.label || field.name} is required`}
//         </p>
//       )}
//     </div>
//   );
// };

// export default React.memo(FormFieldRenderer);

"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import FieldComponentSelector from "./FieldComponentSelector";
import PasswordField from "./PasswordField";
import { FormField } from "./types";

interface FormFieldRendererProps {
  field: FormField;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ field }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[field.name];

  return (
    <div className="form-control w-full space-y-2 text-black">
      {field.label && (
        <label className="label text-sm mt-8 text-white mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {field.type === "password" ? (
        <PasswordField name={field.name} placeholder={field.placeholder} />
      ) : (
        <FieldComponentSelector field={field} register={register} />
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-0.5">
          {error.message?.toString() || `${field.label || field.name} is required`}
        </p>
      )}
    </div>
  );
};

export default React.memo(FormFieldRenderer);
