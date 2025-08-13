/* eslint-disable @typescript-eslint/no-explicit-any */
// export interface FormField {
//   name: string;
//   type: "text" | "email" | "password" | "textarea" | "file" | "select" | "creatable-select" | "multi-select" | "radio" | "checkbox" | "number" | "hidden" | "richtext" | "date" | "phone" ;
//   label?: string;
//   placeholder?: string;
//   maxLength?: number;
//   required?: boolean;
//   value?: any;
//   options?: { label: string; value: string }[];
//   onChange?: (fieldName: string, value: string) => void;
//   validation?: {
//     pattern?: RegExp;
//     message?: string;
//   };
// }

export interface SubtableFieldProps {
  [key: string]: unknown;
  field: FormField;
  register: any;
  control: any;
  required?: boolean;
  errors: any;
  onChange?: (fieldName: string, value: any) => void;
  setValue: (name: string, value: any, options?: any) => void;
}

export interface FormField {
  [key: string]: unknown;
  name: string;
  type: "text" | "email" | "password" | "textarea" | "file" | "select" | "creatable-select" | "multi-select" | "radio" | "checkbox" | "number" | "hidden" | "richtext" | "date" | "phone" | "subtable" | "dynamic-multiselect" ;
  label?: string;
  placeholder?: string;
  initialRows?: number;
  maxLength?: number;
  required?: boolean;
  value?: any;
  options?: { label: string; value: string }[];
  maxRows?: number;
  subFields?: FormField[];
  onChange?: (fieldName: string, value: string) => void;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}
